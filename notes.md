::: details Table of content

[[toc]]

:::

## Code smell
### Bloaters

Bloaters are code, methods and classes that have increased to such gargantuan proportions that they’re hard to work with. Usually these smells don’t crop up right away, rather they accumulate over time as the program evolves (and especially when nobody makes an effort to eradicate them).
#### Long method
A method contains too many lines of code. Generally, any method longer than ten lines should make you start asking questions.

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
#### Large class
A class contains many fields/methods/lines of code.[

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

#### Primitive Obsession
- Use of primitives instead of small objects for simple tasks (such as currency, ranges, special strings for phone numbers, etc.)
- Use of constants for coding information (such as a constant USER_ADMIN_ROLE = 1 for referring to users with administrator rights.)
- Use of string constants as field names for use in data arrays.

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

#### Long Parameter List
More than three or four parameters for a method.

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

#### Data Clumps
Sometimes different parts of the code contain identical groups of variables (such as parameters for connecting to a database). These clumps should be turned into their own classes.

::: tabs
== Before
~~~java
class OrderProcessor {
    public void connect(String url, String username, String password, int port) {
        // Connect to database
    }
}

class ReportGenerator {
    public void connect(String url, String username, String password, int port) {
        // Connect to database
    }
}
~~~
== After
~~~java
class DatabaseCredentials {
    private String url;
    private String username;
    private String password;
    private int port;
    
    public DatabaseCredentials(String url, String username, String password, int port) {
        this.url = url;
        this.username = username;
        this.password = password;
        this.port = port;
    }
}

class OrderProcessor {
    public void connect(DatabaseCredentials credentials) {
        // Connect to database
    }
}

class ReportGenerator {
    public void connect(DatabaseCredentials credentials) {
        // Connect to database
    }
}
~~~
:::

### Object-Orientation Abuser
#### Switch Statements

You have a complex `switch` operator or sequence of `if` statements.

::: tabs
== Before
~~~java
class PaymentProcessor {
    double processPayment(String paymentType, double amount) {
        double fee;
        switch (paymentType) {
            case "CREDIT_CARD":
                fee = amount * 0.03;
                break;
            case "DEBIT_CARD":
                fee = amount * 0.02;
                break;
            case "PAYPAL":
                fee = amount * 0.04;
                break;
            default:
                fee = 0;
        }
        return amount + fee;
    }
}
~~~
== After
~~~java
interface PaymentProcessor {
    double processPayment(double amount);
}

class CreditCardProcessor implements PaymentProcessor {
    public double processPayment(double amount) {
        return amount + (amount * 0.03);
    }
}

class DebitCardProcessor implements PaymentProcessor {
    public double processPayment(double amount) {
        return amount + (amount * 0.02);
    }
}

class PayPalProcessor implements PaymentProcessor {
    public double processPayment(double amount) {
        return amount + (amount * 0.04);
    }
}
~~~
:::

#### Temporary Field

Temporary fields get their values (and thus are needed by objects) only under certain circumstances. Outside of these circumstances, they’re empty.

::: tabs
== Before
~~~java
class Order {
    private double subtotal;
    private double tax;  // Only used during calculation
    private double discount;  // Only used during calculation
    
    public double calculateTotal() {
        tax = subtotal * 0.1;
        discount = subtotal > 100 ? subtotal * 0.05 : 0;
        return subtotal + tax - discount;
    }
}
~~~
== After
~~~java
class Order {
    private double subtotal;

    public double calculateTotal() {
        return subtotal + calculateTax() - calculateDiscount();
    }

    private double calculateTax() {
        return subtotal * 0.1;
    }

    private double calculateDiscount() {
        return subtotal > 100 ? subtotal * 0.05 : 0;
    }
}
~~~
:::

#### Refused Bequest
If a subclass uses only some of the methods and properties inherited from its parents, the hierarchy is off-kilter. The unneeded methods may simply go unused or be redefined and give off exceptions.

::: tabs
== Before
~~~java
class Bird {
    void fly() { /* implementation */ }
    void makeSound() { /* implementation */ }
    void layEggs() { /* implementation */ }
}

class Penguin extends Bird {
    @Override
    void fly() {
        throw new UnsupportedOperationException("Penguins can't fly!");
    }
}
~~~
== After
~~~java
interface Bird {
    void makeSound();
    void layEggs();
}

interface FlyingBird extends Bird {
    void fly();
}

class Sparrow implements FlyingBird {
    public void fly() { /* implementation */ }
    public void makeSound() { /* implementation */ }
    public void layEggs() { /* implementation */ }
}

class Penguin implements Bird {
    public void makeSound() { /* implementation */ }
    public void layEggs() { /* implementation */ }
}
~~~
:::

#### Alternative Classes with Different Interfaces
Two classes perform identical functions but have different method names.
::: tabs
== Before
~~~java
class UserFileHandler {
    void saveUser(User user) { /* saves to file */ }
    User loadUser(int id) { /* loads from file */ }
}

class UserDbManager {
    void writeUserToDatabase(User user) { /* saves to DB */ }
    User getUserFromDatabase(int id) { /* loads from DB */ }
}
~~~
== After
~~~java
// [!code ++]
interface UserStorage {
    void save(User user);
    User load(int id);
}

class FileStorage implements UserStorage {
    public void save(User user) { /* saves to file */ }
    public User load(int id) { /* loads from file */ }
}

class DatabaseStorage implements UserStorage {
    public void save(User user) { /* saves to DB */ }
    public User load(int id) { /* loads from DB */ }
}
~~~
:::

###  Change Preventers

These smells mean that if you need to change something in one place in your code, you have to make many changes in other places too. Program development becomes much more complicated and expensive as a result.
#### Divergent Change

You find yourself having to change many unrelated methods when you make changes to a class. For example, when adding a new product type you have to change the methods for finding, displaying, and ordering products.

::: tabs
== Before
~~~java
class Product {
    private String name;
    private double price;

    // Methods change for different reasons
    public String getDisplayInfo() {
        if (isBook()) {
            return name + " - Author: " + getAuthor();
        } else if (isElectronics()) {
            return name + " - Warranty: " + getWarranty();
        }
        return name;
    }

    public double calculateShipping() {
        if (isBook()) {
            return 2.99;
        } else if (isElectronics()) {
            return 9.99;
        }
        return 4.99;
    }

    public String getInventoryStatus() {
        if (isBook()) {
            return "Books section, aisle " + getBookAisle();
        } else if (isElectronics()) {
            return "Electronics section, shelf " + getElectronicsShelf();
        }
        return "General section";
    }
}
~~~
== After
~~~java
abstract class Product {
    protected String name;
    protected double price;

    abstract String getDisplayInfo();
    abstract double calculateShipping();
    abstract String getInventoryStatus();
}

class Book extends Product {
    private String author;
    
    @Override
    String getDisplayInfo() {
        return name + " - Author: " + author;
    }

    @Override
    double calculateShipping() {
        return 2.99;
    }

    @Override
    String getInventoryStatus() {
        return "Books section, aisle " + getBookAisle();
    }
}

class Electronics extends Product {
    private String warranty;

    @Override
    String getDisplayInfo() {
        return name + " - Warranty: " + warranty;
    }

    @Override
    double calculateShipping() {
        return 9.99;
    }

    @Override
    String getInventoryStatus() {
        return "Electronics section, shelf " + getElectronicsShelf();
    }
}

~~~
:::
#### Shotgun Surgery

Making any modifications requires that you make many small changes to many different classes.

::: tabs
== Before
~~~java
class Customer {
    private String email;
    
    public void sendEmail(String message) {
        System.out.println("Sending email to: " + email);
    }
}

class Order {
    private String customerEmail;
    
    public void notifyCustomer() {
        System.out.println("Sending email to: " + customerEmail);
    }
}

class Support {
    private String userEmail;
    
    public void sendTicketUpdate() {
        System.out.println("Sending email to: " + userEmail);
    }
}
~~~
== After
~~~java
class EmailService {
    public void sendEmail(String email, String message) {
        System.out.println("Sending email to: " + email);
    }
}

class Customer {
    private String email;
    private EmailService emailService;
    
    public void sendEmail(String message) {
        emailService.sendEmail(email, message);
    }
}

class Order {
    private Customer customer;
    private EmailService emailService;
    
    public void notifyCustomer() {
        emailService.sendEmail(customer.getEmail(), "Order update");
    }
}

class Support {
    private Customer customer;
    private EmailService emailService;
    
    public void sendTicketUpdate() {
        emailService.sendEmail(customer.getEmail(), "Ticket update");
    }
}
~~~
:::
#### Parallel Inheritance Hierarchies

Whenever you create a subclass for a class, you find yourself needing to create a subclass for another class.

::: tabs
== Before
~~~java
class Animal {
    protected String name;
}

class Dog extends Animal {
    public void bark() {}
}

class Cat extends Animal {
    public void meow() {}
}

class AnimalFeeder {
    protected String foodType;
}

class DogFeeder extends AnimalFeeder {
    public void feedDog() {}
}

class CatFeeder extends AnimalFeeder {
    public void feedCat() {}
}
~~~
== After
~~~java
class Animal {
    protected String name;
    protected Feeder feeder;
    
    public void feed() {
        feeder.feed();
    }
}

class Dog extends Animal {
    public Dog() {
        this.feeder = new DogFeeder();
    }
    
    public void bark() {}
}

class Cat extends Animal {
    public Cat() {
        this.feeder = new CatFeeder();
    }
    
    public void meow() {}
}

interface Feeder {
    void feed();
}

class DogFeeder implements Feeder {
    public void feed() {
        // Dog specific feeding
    }
}

class CatFeeder implements Feeder {
    public void feed() {
        // Cat specific feeding
    }
}
~~~
:::

### Dispensables

A dispensable is something pointless and unneeded whose absence would make the code cleaner, more efficient and easier to understand.

#### Comments
A method is filled with explanatory comments.

::: tabs
== Before
```java{3,8,13,18}
class UserValidator {
    public boolean validateUser(User user) {
        // Check if the user is null
        if (user == null) {
            return false;
        }
        
        // Check if the username is empty
        if (user.getUsername().isEmpty()) {
            return false;
        }
        
        // Check if the email is valid
        if (!user.getEmail().contains("@")) {
            return false;
        }
        
        // If all checks pass, return true
        return true;
    }
}
```

== After
```java
class UserValidator {
    public boolean validateUser(User user) {
        return user != null
            && !user.getUsername().isEmpty()
            && user.getEmail().contains("@");
    }
}
```
:::

#### Duplicate Code
Two code fragments look almost identical.

::: tabs
== Before
```java{4-9,15-20}
class PaymentProcessor {
    public double calculateRegularPayment(Order order) {
        double total = 0;
        for (Item item : order.getItems()) {
            double price = item.getPrice();
            double tax = price * 0.2;
            double shipping = 5.0;
            total += price + tax + shipping;
        }
        return total;
    }
    
    public double calculatePrimePayment(Order order) {
        double total = 0;
        for (Item item : order.getItems()) {
            double price = item.getPrice();
            double tax = price * 0.2;
            double shipping = 0.0;  // Only difference is free shipping
            total += price + tax + shipping;
        }
        return total;
    }
}
```

== After
```java
class PaymentProcessor {
    public double calculatePayment(Order order, boolean isPrime) {
        double total = 0;
        double shippingFee = isPrime ? 0.0 : 5.0;
        
        for (Item item : order.getItems()) {
            double price = item.getPrice();
            double tax = price * 0.2;
            total += price + tax + shippingFee;
        }
        return total;
    }
}
```
:::

#### Lazy Class
Understanding and maintaining classes always costs time and money. So if a class doesn't do enough to earn your attention, it should be deleted.

::: tabs
== Before
```java
class Address {
    private String street;
    private String city;
}

class AddressFormatter {
    public String format(Address address) {
        return address.getStreet() + ", " + address.getCity();
    }
}
```

== After
```java
class Address {
    private String street;
    private String city;
    
    public String format() {
        return street + ", " + city;
    }
}
```
:::

#### Data Class
A data class refers to a class that contains only fields and crude methods for accessing them.

::: tabs
== Before
```java
class Customer {
    private String name;
    private String email;
    private int age;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}
```

== After
```java
class Customer {
    private String name;
    private String email;
    private int age;

    public boolean isAdult() {
        return age >= 18;
    }
    
    public void sendEmailNotification(String message) {
        EmailService.send(email, message);
    }
    
    public String getFormattedName() {
        return name.toUpperCase();
    }
}
```
:::

#### Dead Code
A variable, parameter, field, method or class is no longer used.

::: tabs
== Before
```java
class OrderProcessor {
    private boolean isLegacySystem = false;  // Never used
    
    public void processOrder(Order order) {
        validateOrder(order);
        // Old payment method, not used anymore
        if (isLegacySystem) {
            processLegacyPayment(order);
        }
        saveOrder(order);
    }
    
    private void processLegacyPayment(Order order) {
        // Legacy payment logic
    }
}
```

== After
```java
class OrderProcessor {
    public void processOrder(Order order) {
        validateOrder(order);
        saveOrder(order);
    }
}
```
:::

#### Speculative Generality
There's an unused class, method, field or parameter.

::: tabs
== Before
```java
interface Animal {
    void eat();
    void sleep();
    void fly();  // What if some animals need to fly?
    void swim();  // What if some animals need to swim?
}

class Cat implements Animal {
    public void eat() { /* implementation */ }
    public void sleep() { /* implementation */ }
    public void fly() { /* empty - cats don't fly */ }
    public void swim() { /* empty - most cats don't swim */ }
}
```

== After
```java
interface Animal {
    void eat();
    void sleep();
}

interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

class Cat implements Animal {
    public void eat() { /* implementation */ }
    public void sleep() { /* implementation */ }
}
```
:::

### Couplers
All the smells in this group contribute to excessive coupling between classes or show what happens if coupling is replaced by excessive delegation.
#### Feature Envy
A method that's more interested in another class than the one it's in.

::: tabs
== Before
```java
class Order {
    private Customer customer;
    
    public double calculateTotal() {
        double basePrice = customer.getBasePrice();
        double discount = customer.getDiscount();
        double tax = customer.getTaxRate();
        
        return basePrice * (1 - discount) * (1 + tax);
    }
}
```

== After
```java
class Order {
    private Customer customer;
    
    public double calculateTotal() {
        return customer.calculatePrice();
    }
}

class Customer {
    public double calculatePrice() {
        return getBasePrice() * (1 - getDiscount()) * (1 + getTaxRate());
    }
}
```
:::

#### Inappropriate Intimacy
Classes that are too tightly coupled, accessing each other's private members.

::: tabs
== Before
```java{6-7}
class Student {
    private List<Course> courses;
    
    public void enrollInCourse(Course course) {
        courses.add(course);
        course.studentList.add(this); // Directly accessing private field
        course.numberOfStudents++; // Directly accessing private field
    }
}

class Course {
    List<Student> studentList;
    private int numberOfStudents;
}
```

== After
```java
class Student {
    private List<Course> courses;
    
    public void enrollInCourse(Course course) {
        courses.add(course);
        course.addStudent(this);
    }
}

class Course {
    private List<Student> studentList;
    private int numberOfStudents;
    
    public void addStudent(Student student) {
        studentList.add(student);
        numberOfStudents++;
    }
}
```
:::

#### Message Chains
Long chains of method calls that create tight coupling between classes.

::: tabs
== Before
```java
class Client {
    public void printUserAddress() {
        String zip = getCompany()
            .getDepartment()
            .getManager()
            .getAddress()
            .getZipCode();
        System.out.println(zip);
    }
}
```

== After
```java
class Client {
    public void printUserAddress() {
        Address address = addressLocator.getManagerAddress(company);
        System.out.println(address.getZipCode());
    }
}

class AddressLocator {
    public Address getManagerAddress(Company company) {
        return company.getManagerAddress();
    }
}
```
:::

#### Middle Man
A class that delegates all its work to another class.

::: tabs
== Before
```java
class PersonProxy {
    private Person person;
    
    public String getName() {
        return person.getName();
    }
    
    public void setName(String name) {
        person.setName(name);
    }
    
    public String getAddress() {
        return person.getAddress();
    }
    
    public void setAddress(String address) {
        person.setAddress(address);
    }
}
```

== After
```java
// Simply use Person directly instead of going through PersonProxy
class Client {
    private Person person;
    
    public void updatePerson(String name, String address) {
        person.setName(name);
        person.setAddress(address);
    }
}
```
:::
## Patterns
#### Strategy
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

#### State
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
#### Composite
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
#### Observer
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
#### Factory
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
#### Decorator
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
#### Template
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
#### Visitor
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
#### Iterator
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
