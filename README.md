# ngxs-generator README

Extension allows you to generate some ngxs boilerplates

## Features

Right-click on `state-name.actions.ts` and enter new action name, and extension generates to you structure like this

**note:** you should have `ActionTypes` enum

```typescript
export enum ActionTypes {
  MY_ACTION = "[StateName] My Action"
};

export class MyAction {
  public static readonly type = ActionTypes.MY_ACTION;

  constructor(public readonly payload: any) {}
}

```

## Known Issues

* Works only on right-click by `state-name.actions.ts ` file
* You should have `ActionTypes` enum

## Release Notes

### 0.1.0

* Action model and type generation by right-click on `state-name.actions.ts ` file

-----------------------------------------------------------------------------------------------------------

### More info

You can find me in Telegram: *@SillyCoon*
