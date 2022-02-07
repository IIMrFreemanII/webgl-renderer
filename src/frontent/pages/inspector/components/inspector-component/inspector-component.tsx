import React, { memo, useCallback, useState } from "react";
import { Vector2, Vector3, Vector4 } from "three";
import cuid from "cuid";
import cn from "classnames";

import { ObservableObject, GameLoop } from "engine";
import {
  CollapseSelfControlled,
  Button,
  Input,
  Checkbox,
  SvgIcon,
  InputLineStatuses,
} from "frontent/components";
import { ObjectType } from "frontent/models";
import { useDidMount, useRerender } from "frontent/hooks";
import { capitalize } from "frontent/utils";

import styles from "./inspector-component.module.css";
import { ReactComponent as CollapseSVG } from "frontent/assets/images/rounded-arrow-right-grey.svg";
import { ReactComponent as PlusSVG } from "frontent/assets/images/plus-sign-grey.svg";
import { ReactComponent as CrossSVG } from "frontent/assets/images/x-cross-rounded-grey.svg";

const statusMap: ObjectType<InputLineStatuses> = {
  x: "error",
  y: "success",
  z: "primary",
  w: "white",
};

export interface ValueFieldProps<T extends ObservableObject> {
  target: T;
  prop: keyof T;
  value: any;
  hideLabel?: boolean;
  onDelete?: VoidFunction;
}

const FieldByType = <T extends ObservableObject>({
  prop,
  value,
  target,
  hideLabel = false,
  onDelete,
}: ValueFieldProps<T>) => {
  const rerender = useRerender();
  const [data, setData] = useState({ target, prop, value });

  const handleUpdate = useCallback((target1, prop1, value1) => {
    setData((prev) => ({ ...prev, value: value1 }));
    GameLoop.once();
  }, []);

  useDidMount(() => {
    target.addObserve(prop, handleUpdate);
    return () => target.removeObserve?.(prop);
  });

  const handleCheckboxChange = (_, checked) => {
    data.target[data.prop] = checked;
  };

  const handleChange = (value) => {
    data.target[data.prop] = value;
  };

  const handleAddItem = (value) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const typeMap = {
      string: "",
      number: 0,
      boolean: false,
      object: null,
    };

    const type = typeMap[typeof value[0]];

    value.push(typeof type === "undefined" ? "" : type);
    rerender();
  };

  const handleRemoveItem = (index) => () => {
    value.splice(index, 1);
    rerender();
  };

  const canDelete = !!onDelete;

  const label = hideLabel ? "" : data.prop.toString();

  const canDeleteStyle = cn({ [styles.canDelete]: canDelete });

  if (value instanceof Vector2 || value instanceof Vector3 || value instanceof Vector4) {
    const entries = Object.entries(value);
    return (
      <div className={styles.vectorWrapper}>
        <div>{capitalize(prop.toString())}</div>
        <div className={styles.inputsWrapper}>
          {entries.map(([key1, value1]) => (
            <FieldByType key={cuid()} prop={key1} value={value1} target={value as any} />
          ))}
        </div>
      </div>
    );
  }

  if (Array.isArray(value)) {
    const entries = Object.entries(value);
    return (
      <>
        <CollapseSelfControlled
          triggerClassName={cn(styles.triggerWrapper, styles.arrayTrigger)}
          contentClassName={styles.collapseWrapper}
          triggerElement={({ isOpened, triggerOpening }) => (
            <>
              <div className={styles.triggerArrayWrapper}>
                <Button onClick={triggerOpening} imageBtn>
                  <SvgIcon
                    className={cn(styles.icon, { [styles.opened]: isOpened })}
                    icon={CollapseSVG}
                    size={20}
                  />
                </Button>
                <span>{capitalize(`${prop}`)}</span>
              </div>
              <div className={styles.triggerLength}>
                <span>{value.length} items</span>
                <Button onClick={handleAddItem(value)} imageBtn>
                  <SvgIcon icon={PlusSVG} size={12} />
                </Button>
              </div>
            </>
          )}
          openDuration={150}
          hideDuration={150}
          removeCollapseByCondition={!value.length}
          removeFromDOMOnClosed
        >
          {entries.map(([prop1, value1], index) => (
            <FieldByType
              key={cuid()}
              prop={prop1}
              value={value1}
              target={value as any}
              onDelete={handleRemoveItem(index)}
              hideLabel
            />
          ))}
        </CollapseSelfControlled>
      </>
    );
  }

  if (typeof value === "boolean") {
    return (
      <Checkbox
        label={label}
        value={label}
        placement="left"
        checked={data.value}
        onChange={handleCheckboxChange}
        disableError
      />
    );
  }

  if (typeof value === "number") {
    return (
      <Input
        type="number"
        inputWrapperClassName={cn(styles.inputWrapper, canDeleteStyle)}
        className={styles.inputContainer}
        statusLine={statusMap[data.prop]}
        label={label}
        value={data.value}
        onChange={handleChange}
        normalize={(value) => {
          if (isNaN(Number(value))) return 0;
          return Number(value);
        }}
        disableError
      >
        {canDelete && (
          <Button className={styles.deleteIcon} onClick={onDelete} imageBtn>
            <SvgIcon icon={CrossSVG} size={12} />
          </Button>
        )}
      </Input>
    );
  }

  if (typeof value === "string") {
    return (
      <Input
        label={label}
        inputWrapperClassName={cn(styles.inputWrapper, canDeleteStyle)}
        value={data.value}
        onChange={handleChange}
        disableError
      >
        {canDelete && (
          <Button className={styles.deleteIcon} onClick={onDelete} imageBtn>
            <SvgIcon icon={CrossSVG} size={12} />
          </Button>
        )}
      </Input>
    );
  }

  return (
    <Input
      label={label}
      inputWrapperClassName={cn(styles.inputWrapper, canDeleteStyle)}
      value={value?.constructor.name || `${value}`}
      onChange={handleChange}
      disableError
      disableTextEdition
      disabled
    >
      {canDelete && (
        <Button className={styles.deleteIcon} onClick={onDelete} imageBtn>
          <SvgIcon icon={CrossSVG} size={12} />
        </Button>
      )}
    </Input>
  );
};

export interface InspectorComponentProps {
  component: ObservableObject;
}

export const InspectorComponent: React.FC<InspectorComponentProps> = memo(({ component }) => {
  const fields = Object.entries(component);

  console.log(component.type, "render");

  return (
    <div className={styles.container}>
      <CollapseSelfControlled
        triggerClassName={styles.triggerWrapper}
        contentClassName={styles.collapseWrapper}
        triggerElement={({ isOpened, triggerOpening }) => (
          <>
            <Button onClick={triggerOpening} imageBtn>
              <SvgIcon
                className={cn(styles.icon, { [styles.opened]: isOpened })}
                icon={CollapseSVG}
              />
            </Button>
            <span>{component.type}</span>
          </>
        )}
        openDuration={150}
        hideDuration={150}
        removeFromDOMOnClosed
      >
        {fields.map(([prop, value]) => (
          <FieldByType key={cuid()} prop={prop} value={value} target={component} />
        ))}
      </CollapseSelfControlled>
    </div>
  );
});
