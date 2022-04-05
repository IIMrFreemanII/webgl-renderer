import * as React from "react";
import ReactDOM from "react-dom";

import { Providers } from "./frontent/components/client/providers";
import { App } from "./app";

import "frontent/assets/styles/index.css";
import { autorun, makeObservable, User } from "./test-ideas/test-decorators";

const user = makeObservable(new User());
user.name = "Nick";

autorun(() => {
  console.log(user.name);
});

user.name = "Vova";

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById("root"),
);
