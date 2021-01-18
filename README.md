# ngxs-generator README

Extension allows you to generate some ngxs boilerplates

## Features

### State structure generation

Right-click on future state folder and enter state name in `PascalCase`. This action with input `MyTest` generates you Ngxs state structure like this

`my-test.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { MyTestState } from './my-test.state';

@NgModule({
  imports: [
    NgxsModule.forFeature([MyTestState]),
  ],
})
export class MyTestStateModule {}
```

`my-test.state.ts`

```typescript
import { Injectable } from '@angular/core';
import { TOKEN } from './my-test.const';
import { State } from '@ngxs/store';

export class MyTestStateModel {

}

@State<MyTestStateModel>({
  name: TOKEN,
  defaults: new MyTestStateModel(),
})
@Injectable()
export class MyTestState {
  public baseUrl = '';

}

```

`my-test.actions.ts`

```typescript
export enum ActionTypes {

}
```

`my-state.selectors.ts`

```typescript
import { Selector } from '@ngxs/store';

export class MyTestSelectors {

}
```

`my-test.const.ts`

```typescript
export const TOKEN = 'MY_TEST';

export const MY_TEST_API_PATHS = {
};
```
### Action generation
Right-click on `state-name.actions.ts` and enter new action name in `PascalCase`. This action with input `MyAction` generates you Ngxs action like this

**note:** you should have `ActionTypes` enum and `my-state.state.ts` with specific structure

`my-state.actions.ts`

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

**Action generation**:
* Works only on right-click by `state-name.actions.ts ` file
* You should have `ActionTypes` enum
* You should have `state-name.state.ts` file with structure above

**State generation**
* Works only on right-click by the directory for generating state

## Release Notes

### 0.1.0

* Action model and type generation by right-click on `state-name.actions.ts ` file

### 0.2.0

* Complete action generation model and type + create action handler function in state

### 1.0.0

* Add State files structure generation

-----------------------------------------------------------------------------------------------------------

### More info

You can find me in Telegram: *@SillyCoon*
