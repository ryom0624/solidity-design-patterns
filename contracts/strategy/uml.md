# Strategy Pattern

> strategy pattern (also known as the policy pattern) is a behavioral software design pattern that enables selecting an algorithm at runtime.
> https://en.wikipedia.org/wiki/Strategy_pattern

カモのシミュレーションゲーム

カモを表示、カモは泳ぐ、泣くなどの機能がある

通常のあるある設計

```mermaid
classDiagram
    Duck <|-- MallardDuck: Inheritance
    Duck <|-- RedheadDuck: Inheritance
    class Duck {
        + quack()
        + swim()
        + dislay()
    }
    class MallardDuck {
        + dislay()
    }
    class RedheadDuck {
        + dislay()
    }
```

競合に勝つために飛ぶアヒルを加える決断をした。

```mermaid
classDiagram
    Duck <|-- MallardDuck: Inheritance
    Duck <|-- RedheadDuck: Inheritance
    class Duck {
        + quack()
        + swim()
        + dislay()
        + fly()
    }
    class MallardDuck {
        + dislay()
    }
    class RedheadDuck {
        + dislay()
    }
```

すべてのアヒルが飛んでしまう問題が発生した。（飛ばないアヒルもいる仕様）

```mermaid
classDiagram
    Duck <|-- MallardDuck: Inheritance
    Duck <|-- RedheadDuck: Inheritance
    Duck <|-- RubberDuck: Inheritance
    Duck <|-- DecoyDuck: Inheritance

    Flyable <|-- MallardDuck: Implements
    Flyable <|-- RedheadDuck: Implements
    Quackable <|-- MallardDuck: Implements
    Quackable <|-- RedheadDuck: Implements
    Quackable <|-- RubberDuck: Implements

    class Duck {
        + quack()
        + swim()
        + dislay()
    }
    class Quackable {
        <<interface>>
        + quack()
    }
    class Flyable {
        <<interface>>
        + fly()
    }
    class MallardDuck {
        + dislay()
        + fly()
        + quack()
    }
    class RedheadDuck {
        + dislay()
        + fly()
        + quack()
    }
    class RubberDuck {
        + dislay()
        + quack()
    }
    class DecoyDuck {
        + dislay()
    }

```

インターフェイスだと各クラスに独自の実装をもつ必要があり、保守的な観点で必要以上の変更量となってしまう。

↓ strategy パターン

```mermaid
classDiagram

    class Duck {
        +FlyBehavior flyBehavior
        +QuackBhavior quackBhavior
        +swim()
        +display()
        +performQuack()
        +performFly()
        +setFlyBehavior()
        +setQuackBehavior()
    }

    class MallardDuck {
        +display()
    }
    class RedheadDuck {
        +display()
    }
    class RubberDuck {
        +display()
    }
    class DecoyDuck {
        +display()
    }
    Duck <|-- MallardDuck : Inheritance
    Duck <|-- RedheadDuck : Inheritance
    Duck <|-- RubberDuck : Inheritance
    Duck <|-- DecoyDuck : Inheritance
    Duck --* FlyBehavior : Composition
    Duck --* QuackBehavior : Composition

    class FlyBehavior {
        <<interface>>
        fly()
    }
    class FlyWithWing {
        fly()
    }
    class FlyNoWay {
        fly()
    }
    class FlyRocketPowered {
        fly()
    }
    FlyBehavior <|-- FlyWithWing : implements
    FlyBehavior <|-- FlyNoWay : implements
    FlyBehavior <|-- FlyRocketPowered : implements

    class QuackBehavior {
        <<interface>>
        quack()
    }
    class Quack {
        quack()
    }
    class Squeak {
        quack()
    }
    class MuteQuack {
        quack()
    }
    QuackBehavior <|-- Quack : implements
    QuackBehavior <|-- Squeak : implements
    QuackBehavior <|-- MuteQuack : implements


```
