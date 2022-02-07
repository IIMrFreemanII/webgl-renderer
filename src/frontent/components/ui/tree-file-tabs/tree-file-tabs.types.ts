import React from "react";

export type ValidComponentType = React.ReactNode;

export type TreeFileType = {
  name: string;
  description?: string;
  onClick?: VoidFunction;
};

export type TreeFolderItemContentType = Array<TreeFolderType | TreeFileType>;

export type TreeFolderType = {
  name: string;
  description?: string;
  content?: TreeFolderItemContentType; // Reminder. If you would like to change "content" prop name, change it also for calcSelectedItem func in utils
  onClick?: VoidFunction;
};

export type TreeItemType = TreeFileType | TreeFolderType;
