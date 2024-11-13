## Relationships

# 1. Association
**Description**: Basic relationship where one class uses another class in some way
**Example**: A Student takes Courses

```mermaid
classDiagram
    class Student {
        -name: String
        +enrollInCourse(Course)
    }
    class Course {
        -courseId: String
        +getDetails()
    }
    Student --> Course : takes

```

# 2. Inheritance
**Description**: "is-a" relationship where child class inherits from parent class
**Example**: Dog is an Animal

```mermaid
classDiagram
    class Animal {
        -name: String
        +makeSound()
    }
    class Dog {
        -breed: String
        +fetch()
    }
    Dog --|> Animal

```

# 3. Implementation
**Description**: A class implements an interface (dashed arrow)
**Example**: Car implements Vehicle interface

```mermaid
classDiagram
    class Vehicle {
        <<interface>>
        +start()
        +stop()
    }
    class Car {
        -model: String
        +start()
        +stop()
    }
    Car ..|> Vehicle

```

# 4. Dependency
**Description**: Weaker relationship where one class temporarily uses another
**Example**: Printer depends on PrintJob for printing

```mermaid
classDiagram
    class Printer {
        +print(PrintJob)
    }
    class PrintJob {
        -content: String
        +getContent()
    }
    Printer ..> PrintJob : uses

```

# 5. Aggregation
**Description**: "has-a" relationship where parts can exist independently of the whole
**Example**: University has Students, but Students can exist without University

```mermaid
classDiagram
    direction LR
    class University {
        -name: String
        +addStudent()
    }
    class Student {
        -id: String
        +enroll()
    }
    University o-- Student : has

```

# 6. Composition
**Description**: Strong "has-a" relationship where parts cannot exist without the whole
**Example**: House has Rooms, Rooms cannot exist without House

```mermaid
classDiagram
    class House {
        -address: String
        +addRoom()
    }
    class Room {
        -size: int
        +getDetails()
    }
    House *-- Room : contains

```

Key differences:
- Association is a general "uses" relationship
- Inheritance shows an "is-a" relationship
- Implementation shows interface fulfillment
- Dependency is a weak, temporary usage
- Aggregation shows containment where parts can exist independently
- Composition shows containment where parts cannot exist independently


## Functional Interfaces

```java
// 1. Function<T,R> - Transform input to different output
Function<String, Integer> lengthFn = str -> str.length();
// Usage: lengthFn.apply("hello") -> 5

// 2. Consumer<T> - Accept input, return nothing
Consumer<String> printer = msg -> System.out.println(msg);
// Usage: printer.accept("hi") -> prints "hi"

// 3. Predicate<T> - Test input, return boolean
Predicate<String> isEmpty = str -> str.length() == 0;
// Usage: isEmpty.test("") -> true

// 4. Supplier<T> - Supply value without input
Supplier<String> greeter = () -> "hello";
// Usage: greeter.get() -> "hello"
```
