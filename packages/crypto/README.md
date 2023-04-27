# @futurefab/xdashboard-core

XDashboard核心套件，更多套件请查阅 https://github.com/yugasun/kit


## 介绍
`@futurefab/xdashboard-core` 是基于vue@3的Dashboard布局套件，用于快速开发可配置的Dashboard界面。

主要功能如下
 - 自定义卡片类型映射
 - 基于配置渲染
    - 可实现持久化
 - 支持灵活扩展
    - `CardLayoutCustomize` 搭配 `CardLayout`，实现简单的卡片通用操作开发
 - 支持多种布局

## 基本用法
请参考不同 layout/布局 的示例
 - [grid-layout](./packages/grid-layout/)
 - [splitpanes-layout](./packages/splitpanes-layout/)

## 接口文档
### Dashboard
目前支持 [grid-layout](./packages/grid-layout/) 与 [splitpanes-layout](./packages/splitpanes-layout/) 两种布局，请参考它们的文档


### CardComponent
`dashboard` 的 `cardMapping` 定义了 `componentType` 到 `CardComponent` 的映射，

一个卡片组件( [CardComponent](./src/types.ts#L123) )需要实现以下属性/事件
 - `Props` 定义于 [types.ts](./src/types.ts#L100)
    | 属性 | 类型 | 必选 | 默认值 | 描述 |
    | --- | --- | --- | --- | --- |
    |config|TConfig|是|-|卡片的持久化配置，类型由卡片组件自行声明维护|
 - `Emits` 定义于 [types.ts](./src/types.ts#L105)
    | 事件 | 参数 | 说明 |
    | --- | --- | --- |
    | update:config | TConfig | 卡片的持久化配置变更事件 |

同时卡片内支持以下inject (定义于 [types.ts](./src/types.ts))

  | InjectionKey | 类型 | 描述 |
  | --- | --- | --- |
  | GridLayoutSize | [GridLayoutSizeType](./src/types.ts#L51) | dashboard layout信息监听 |
  | CardContainerSizeInject | [CardSizeType](./src/types.ts#L67) | 卡片外容器大小变化监听 |
  | CardItemInject | [CardItem](./src/types.ts#L15) | 卡片配置监听 |
  | CardItemUpdaterInject | (v: [CardItemUpdates](./src/types.ts#L26))=>void | 卡片配置变更方法监听 |

### CardItem
一个卡片的通用配置示例如下
```ts
{
  // 卡片唯一id，请自行生成
  id: '1',
  // 卡片类型，由 dashboard#cardMapping 映射到具体的卡片组件
  componentType: 'foo',
  // 卡片持久化配置，由卡片组件自行维护
  config: {
    foo: 'bar'
  },
  // 卡片布局信息，由 xdashboard 具体的 layout 维护
  layout: {
    // ...
  },
  // 也支持扩展其它自定义参数，需自行扩展 `CardItem` 类型
  ...
}
```


### CardLayout
提供通用的卡片内部布局，包含 `title`、`toolbox`、`body` 三块区域，分别对应 `title`、`toolbox`、`default` 插槽(slot)，可配合 `CardLayoutCustomize` 使用

用法如下
```tsx
<CardLayout>
    <template #toolbox>
      <a>工具栏-编辑</a>
    </template>
    内容
</CardLayout>
```

### CardLayoutCustomize
提供 dashboard 级别的 `CardLayout` 定制，例如给所有卡片添加 关闭 按钮

支持以下 属性/插槽
 - `Props`
    | 属性 | 类型 | 必选 | 默认值 | 描述 |
    | --- | --- | --- | --- | --- |
    | toolboxRenderers | Renderer[] | 否 | - | 指定卡片 toolbox 的渲染插件 |
    | titleRenderers | Renderer[] | 否 | - | 指定卡片 title 的渲染插件 |
    | bodyRenderers | Renderer[] | 否 | - | 指定卡片 body 的渲染插件 |

    其中Renderer的类型为 `(props: { item: CardItem }) => VNode[]`
 - `Slots`
    
    与 `Props` 中的 xxxRenderers 相同，提供更简单的 slot 语法定制，对应关系(slot -> props)如下
      - card-toolbox -> toolboxRenderers
      - card-title -> titleRenderers
      - card-body -> bodyRenderers

    使用示例
    ```tsx
    <CardLayoutCustomize>
      <template #card-toolbox="{ item }">
        <a-tooltip title="关闭">
          <a @click="removeCard(item)" style="margin-left: 5px"><CloseOutlined /></a>
        </a-tooltip>
      </template>
      <Dashboard ... />
    </CardLayoutCustomize>
    ```

如果你不喜欢多包装一层组件，可以使用组合api版的方法 `useCardLayoutCustomize`，入参即 `CardLayoutCustomize` 的 `Props`

## 调试
```js
localStorage.debug = 'xdashboard:core*'
```