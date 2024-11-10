## SOLID

### Single Responsibility Principle (SRP)
A class should have only one reason to change.

::: tabs
== Before

```java
class UserManager {
    public void saveUser(User user) {
        // Save user to database
        db.save(user);
    }
    
    public void emailUser(User user) {
        // Send email
        emailService.send(user.getEmail(), "Welcome!", "Welcome to our platform!");
    }
    
    public void generateUserReport(User user) {
        // Generate PDF report
        PDFGenerator.create(user.getData());
    }
}

```
== After

```java
class UserRepository {
    public void saveUser(User user) {
        db.save(user);
    }
}

class UserNotificationService {
    public void emailUser(User user) {
        emailService.send(user.getEmail(), "Welcome!", "Welcome to our platform!");
    }
}

class UserReportGenerator {
    public void generateUserReport(User user) {
        PDFGenerator.create(user.getData());
    }
}
```

:::

### Open/Closed Principle (OCP)
Software entities should be open for extension but closed for modification.

::: tabs
== Before

```java
class PaymentProcessor {
    public void processPayment(String type, double amount) {
        if (type.equals("credit")) {
            // Process credit payment
        } else if (type.equals("debit")) {
            // Process debit payment
        }
        // Adding new payment type requires modifying this class
    }
}

```

== After

```java
interface PaymentMethod {
    void processPayment(double amount);
}

class CreditPayment implements PaymentMethod {
    public void processPayment(double amount) {
        // Process credit payment
    }
}

class DebitPayment implements PaymentMethod {
    public void processPayment(double amount) {
        // Process debit payment
    }
}

// New payment methods can be added without modifying existing code
class CryptoPayment implements PaymentMethod {
    public void processPayment(double amount) {
        // Process crypto payment
    }
}
```

:::

### Liskov Substitution Principle (LSP)
Objects of a superclass should be replaceable with objects of its subclasses without breaking the application.

::: tabs
== Before

```java
class Bird {
    public void fly() {
        // Flying implementation
    }
}

class Penguin extends Bird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Penguins can't fly!");
    }
}
```

== After
```java
interface Swimmable {
    /**
     * @precondition depth > 0
     * @postcondition currentDepth >= 0 && currentDepth <= depth
     */
    void swim(int depth);
}

interface Flyable {
    /**
     * @precondition altitude > 0
     * @postcondition currentAltitude <= maxAltitude
     */
    void fly(int altitude);
}

class Bird implements Flyable {
    protected int currentAltitude;
    protected final int maxAltitude;
    
    public Bird(int maxAltitude) {
        this.maxAltitude = maxAltitude;
    }
    
    public void fly(int altitude) {
        assert altitude > 0 : "Altitude must be positive";
        currentAltitude = Math.min(altitude, maxAltitude);
        assert currentAltitude <= maxAltitude : "Cannot exceed maximum altitude";
    }
}

class Penguin implements Swimmable {
    private int currentDepth;
    
    public void swim(int depth) {
        assert depth > 0 : "Depth must be positive";
        currentDepth = depth;
        assert currentDepth >= 0 && currentDepth <= depth : "Invalid depth reached";
    }
}
```
:::

### Interface Segregation Principle (ISP)
Clients should not be forced to depend on interfaces they do not use.

::: tabs
== Before

```java
interface Worker {
    void work();
    void eat();
    void sleep();
}

class Robot implements Worker {
    public void work() { /* */ }
    public void eat() { throw new UnsupportedOperationException(); }
    public void sleep() { throw new UnsupportedOperationException(); }
}
```

== After
```java
interface Workable {
    void work();
}

interface LivingEntity {
    void eat();
    void sleep();
}

class Robot implements Workable {
    public void work() { /* */ }
}

class Human implements Workable, LivingEntity {
    public void work() { /* */ }
    public void eat() { /* */ }
    public void sleep() { /* */ }
}
```
:::

### Dependency Inversion Principle (DIP)
High-level modules should not depend on low-level modules. Both should depend on abstractions.

::: tabs
== Before

```java
class EmailService {
    private MySQLDatabase database;
    
    public EmailService() {
        this.database = new MySQLDatabase();
    }
    
    public void sendEmail(String message) {
        database.save(message);
        // Send email
    }
}
```

== After
```java
interface MessageDatabase {
    void save(String message);
}

class MySQLDatabase implements MessageDatabase {
    public void save(String message) {
        // Save to MySQL
    }
}

class EmailService {
    private final MessageDatabase database;
    
    public EmailService(MessageDatabase database) {
        this.database = database;
    }
    
    public void sendEmail(String message) {
        database.save(message);
        // Send email
    }
}
```
:::
