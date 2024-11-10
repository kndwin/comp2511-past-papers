::: details Table of content

[[toc]]

:::

## Code smell
### Bloaters
#### Long method

:::tabs
== Before

~~~java
class OrderProcessor {
    public void processOrder(Order order) {
        // Validate order
        if (order.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order is empty");
        }
        if (order.getCustomer() == null) {
            throw new IllegalArgumentException("Customer is missing");
        }
        
        // Calculate totals
        double subtotal = 0;
        for (Item item : order.getItems()) {
            subtotal += item.getPrice() * item.getQuantity();
        }
        double tax = subtotal * 0.1;
        double total = subtotal + tax;
        
        // Apply discount
        if (order.getCustomer().isVip()) {
            total = total * 0.9;
        }
        
        // Update inventory
        for (Item item : order.getItems()) {
            Inventory.decrease(item.getId(), item.getQuantity());
        }
        
        // Save order
        order.setTotal(total);
        Database.save(order);
    }
}
~~~

== After

~~~java
class OrderProcessor {
    public void processOrder(Order order) {
        validateOrder(order);
        double total = calculateTotal(order);
        total = applyDiscount(total, order.getCustomer());
        updateInventory(order.getItems());
        saveOrder(order, total);
    }

    private void validateOrder(Order order) {
        if (order.getItems().isEmpty()) throw new IllegalArgumentException("Order is empty");
        if (order.getCustomer() == null) throw new IllegalArgumentException("Customer is missing");
    }

    private double calculateTotal(Order order) {
        double subtotal = order.getItems().stream()
            .mapToDouble(item -> item.getPrice() * item.getQuantity())
            .sum();
        return subtotal + (subtotal * 0.1); // Add tax
    }

    private double applyDiscount(double total, Customer customer) {
        return customer.isVip() ? total * 0.9 : total;
    }

    private void updateInventory(List<Item> items) {
        items.forEach(item -> Inventory.decrease(item.getId(), item.getQuantity()));
    }

    private void saveOrder(Order order, double total) {
        order.setTotal(total);
        Database.save(order);
    }
}
~~~

:::
### Large class

:::tabs
== Before

~~~java
class UserManager {
    private String username;
    private String password;
    private String email;
    private String address;
    private String phoneNumber;
    private List<Order> orders;
    private PaymentDetails paymentDetails;
    private ShippingPreferences shippingPreferences;
    
    public void createUser() { /* ... */ }
    public void updateProfile() { /* ... */ }
    public void changePassword() { /* ... */ }
    public void processOrder() { /* ... */ }
    public void calculateShipping() { /* ... */ }
    public void handlePayment() { /* ... */ }
    // Many more methods...
}
~~~
== After
~~~java
class User {
    private String username;
    private String password;
    private String email;
    private Profile profile;
}

class Profile {
    private String address;
    private String phoneNumber;
}

class OrderManager {
    public void processOrder(Order order) { /* ... */ }
    public void calculateShipping(ShippingPreferences prefs) { /* ... */ }
}

class PaymentProcessor {
    public void handlePayment(PaymentDetails details) { /* ... */ }
}
~~~

:::

### Primitive Obsession
::: tabs
== Before

~~~java
class User {
    private String phoneNumber;  // Format: "XXX-XXX-XXXX"
    private int userType;        // 1 = admin, 2 = regular, 3 = guest
    private double money;        // USD
    
    public boolean isAdmin() {
        return userType == 1;
    }
}
~~~

== After

~~~java
class User {
    private PhoneNumber phoneNumber;
    private UserType userType;
    private Money money;
    
    public boolean isAdmin() {
        return userType == UserType.ADMIN;
    }
}

class PhoneNumber {
    private String number;
    public PhoneNumber(String number);
}

enum UserType {
    ADMIN, REGULAR, GUEST
}

class Money {
    private BigDecimal amount;
    private Currency currency;
}
~~~

:::

### Long Parameter List

::: tabs
== Before
~~~java
class Report {
    public void generateReport(String title, String date, String author, 
                             String content, String format, String fontSize,
                             String color) {
        // Generate report with all parameters
    }
}
~~~
== After
~~~java
class ReportConfig {
    private String title;
    private String date;
    private String author;
    private String content;
    private Format format;
}

class Report {
    public void generateReport(ReportConfig config) {
        // Generate report using config object
    }
}
~~~
:::

## Patterns
### Strategy

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

### State
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
### Composite
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
### Observer
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
### Factory
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
### Decorator
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
### Template
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
### Visitor
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
### Iterator
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
