# ngxs-generator README

Extension allows you to generate some ngxs boilerplates

## Features

Right-click on `state-name.actions.ts` and enter new action name, and extension generates to you structure like this

**note:** you should have `ActionTypes` enum and `my-state.state.ts` with specific structure

`my-state.action.ts`

```typescript
export enum ActionTypes {
  MyAction = "[StateName] My Action"
};

export class MyAction {
  public static readonly type = ActionTypes.MyAction;

  constructor(public readonly payload: any) {}
}
```

`my-state.state.ts`

```typescript
import { Injectable } from '@angular/core';
...
import { MyAction } from './my-test.actions';

export class MyStateStateModel  {
  ...
}

@State<MyStateStateModel>({
  name: 'SomeName',
  defaults: {
    ...
  }
})
@Injectable()
export class MyStateState {
  @Action(MyAction)
  public myAction(ctx: StateContext<MyStateStateModel>, action: MyAction) {
    ctx.patchState({

    });
  }
}
```

## Known Issues

* Works only on right-click by `state-name.actions.ts ` file
* You should have `ActionTypes` enum
* You should have `state-name.state.ts` file with structure above

## Release Notes

### 0.1.0

* Action model and type generation by right-click on `state-name.actions.ts ` file

### 0.1.1

* Complete action creation - model and type + create action handler function in state

-----------------------------------------------------------------------------------------------------------

### More info

You can find me in Telegram: *@SillyCoon*
