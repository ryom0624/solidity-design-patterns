# Strategy Pattern

> strategy pattern (also known as the policy pattern) is a behavioral software design pattern that enables selecting an algorithm at runtime.
> https://en.wikipedia.org/wiki/Strategy_pattern

Requirements

- FlyRocketPowered is a new implementation by specification changed

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
