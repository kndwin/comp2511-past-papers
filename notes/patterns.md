## Strategy
- Dynamically change strategies at runtime
- Add/remove strategies at will
- Limited logic around changing strategies
```java
// 1. Strategy Pattern
interface PaymentStrategy { void pay(int amount); }
class PayPal implements PaymentStrategy { 
    public void pay(int amount) { System.out.println("PayPal: $" + amount); }
}
class CreditCard implements PaymentStrategy {
    public void pay(int amount) { System.out.println("CC: $" + amount); }
}
class Cart {
    private PaymentStrategy paymentStrategy;
    public void setStrategy(PaymentStrategy strategy) { this.paymentStrategy = strategy; }
    public void checkout(int amount) { paymentStrategy.pay(amount); }
}
```

## State
- Has states
- Actions -> cause transitions
- Logic around those actions
~~~java
// 2. State Pattern
interface State { void handle(Player player); }
class StandingState implements State {
    public void handle(Player player) { player.setState(new JumpingState()); }
}
class JumpingState implements State {
    public void handle(Player player) { player.setState(new StandingState()); }
}
class Player {
    private State state = new StandingState();
    public void setState(State state) { this.state = state; }
    public void action() { state.handle(this); }
}
~~~
## Composite
- Compound nodes + Left nodes
- Tree hierarchy
- You don't care whether you're talking to a leaf or a compound node
~~~java
// 3. Composite Pattern
abstract class FileSystem {
    protected String name;
    abstract void ls();
}
class File extends FileSystem {
    public File(String name) { this.name = name; }
    void ls() { System.out.println(name); }
}
class Directory extends FileSystem {
    private List<FileSystem> children = new ArrayList<>();
    public Directory(String name) { this.name = name; }
    public void add(FileSystem fs) { children.add(fs); }
    void ls() {
        System.out.println(name);
        children.forEach(FileSystem::ls);
    }
}
~~~
## Observer
- Thing being observed (subject, consumer, subscriber, listener)
- Thing doing the observing (observer, producer)
- Method of notification (push/pull)
- A change in state causes the updating/notification
~~~java
// 1. Observer Pattern
interface Observer { void update(String news); }
class NewsAgency {
    private List<Observer> observers = new ArrayList<>();
    public void addObserver(Observer o) { observers.add(o); }
    public void notifyObservers(String news) { observers.forEach(o -> o.update(news)); }
}
class NewsChannel implements Observer {
    public void update(String news) { System.out.println("Breaking: " + news); }
}
~~~
## Factory
- Create other objects - have some logic around creation
-  Abstraction creation in some way
~~~java
interface Animal { void speak(); }
class Dog implements Animal { public void speak() { System.out.println("Woof"); } }
class Cat implements Animal { public void speak() { System.out.println("Meow"); } }
class AnimalFactory {
    public Animal createAnimal(String type) {
        return switch (type) {
            case "dog" -> new Dog();
            case "cat" -> new Cat();
            default -> throw new IllegalArgumentException();
        };
    }
}
~~~
## Decorator
- Dynamically add functionality
- "Layering" / wrapping
- Can decorate to an interface, not an implementation
~~~java
interface Coffee { double cost(); }
class SimpleCoffee implements Coffee { public double cost() { return 1; } }
abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;
    public CoffeeDecorator(Coffee c) { this.coffee = c; }
    public double cost() { return coffee.cost(); }
}
class Milk extends CoffeeDecorator {
    public Milk(Coffee c) { super(c); }
    public double cost() { return super.cost() + 0.5; }
}
~~~
## Template
- Series of steps
- Some steps are abstractly defined, some concretely defined
- "Hook" methods
~~~java
abstract class DataMiner {
    public final void mine() {
        openFile();
        extractData();
        parseData();
        closeFile();
    }
    abstract void extractData();
    void openFile() { System.out.println("Opening"); }
    void parseData() { System.out.println("Parsing"); }
    void closeFile() { System.out.println("Closing"); }
}
class PDFMiner extends DataMiner {
    void extractData() { System.out.println("Extracting PDF"); }
}
~~~
## Visitor
- Seperate algorithm and implementation
- Add functionality to an existing system (legacy)
- Build in "hook" into the system to latch functionality on
~~~java
interface Shape { void accept(ShapeVisitor visitor); }
class Circle implements Shape {
    public void accept(ShapeVisitor visitor) { visitor.visit(this); }
}
class Square implements Shape {
    public void accept(ShapeVisitor visitor) { visitor.visit(this); }
}
interface ShapeVisitor {
    void visit(Circle circle);
    void visit(Square square);
}
class AreaVisitor implements ShapeVisitor {
    public void visit(Circle circle) { System.out.println("Calculate circle area"); }
    public void visit(Square square) { System.out.println("Calculate square area"); }
}
~~~
## Iterator
- Abstract traversal from container/algorithm
- Access elements in a linear order
~~~java
class CustomCollection<T> {
    private List<T> items = new ArrayList<>();
    public void add(T item) { items.add(item); }
    
    public Iterator<T> iterator() {
        return new Iterator<T>() {
            private int index = 0;
            public boolean hasNext() { return index < items.size(); }
            public T next() { return items.get(index++); }
        };
    }
}
~~~
