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

# Design Patterns Classification Tree

## 1. Creational Patterns
*Handle object creation mechanisms*
- ### Factory Method
  - Creates objects without specifying exact class
  - Defers creation to subclasses
  ```java
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
  ```

- ### Abstract Factory
  - Creates families of related objects
  ```java
  interface GUIFactory {
      Button createButton();
      Checkbox createCheckbox();
  }
  
  class WindowsFactory implements GUIFactory {
      public Button createButton() { return new WindowsButton(); }
      public Checkbox createCheckbox() { return new WindowsCheckbox(); }
  }
  
  class MacFactory implements GUIFactory {
      public Button createButton() { return new MacButton(); }
      public Checkbox createCheckbox() { return new MacCheckbox(); }
  }
  ```

- ### Builder
  - Constructs complex objects step by step
  ```java
  class Pizza {
      private String dough;
      private String sauce;
      private String topping;
      
      public static class Builder {
          private Pizza pizza = new Pizza();
          
          public Builder dough(String dough) {
              pizza.dough = dough;
              return this;
          }
          
          public Builder sauce(String sauce) {
              pizza.sauce = sauce;
              return this;
          }
          
          public Builder topping(String topping) {
              pizza.topping = topping;
              return this;
          }
          
          public Pizza build() {
              return pizza;
          }
      }
  }
  ```

- ### Prototype
  - Clones existing objects
  ```java
  interface Prototype {
      Prototype clone();
  }
  
  class ConcretePrototype implements Prototype {
      private String field;
      
      public ConcretePrototype(String field) {
          this.field = field;
      }
      
      public Prototype clone() {
          return new ConcretePrototype(this.field);
      }
  }
  ```

- ### Singleton
  - Ensures only one instance exists
  ```java
  class Singleton {
      private static Singleton instance;
      private Singleton() {}
      
      public static Singleton getInstance() {
          if (instance == null) {
              instance = new Singleton();
          }
          return instance;
      }
  }
  ```

## 2. Structural Patterns
*Handle object composition and relationships*

- ### Adapter
  - Allows incompatible interfaces to work together
  ```java
  interface Target {
      void request();
  }
  
  class Adaptee {
      void specificRequest() {
          System.out.println("Specific request");
      }
  }
  
  class Adapter implements Target {
      private Adaptee adaptee;
      
      public Adapter(Adaptee adaptee) {
          this.adaptee = adaptee;
      }
      
      public void request() {
          adaptee.specificRequest();
      }
  }
  ```

- ### Bridge
  - Separates abstraction from implementation
  ```java
  interface Device {
      void turnOn();
      void turnOff();
  }
  
  abstract class Remote {
      protected Device device;
      
      public Remote(Device device) {
          this.device = device;
      }
      
      abstract void power();
  }
  
  class BasicRemote extends Remote {
      public BasicRemote(Device device) {
          super(device);
      }
      
      void power() {
          device.turnOn();
      }
  }
  ```

- ### Composite
  - Treats individual objects and compositions uniformly
  *(Already provided in original document)*

- ### Decorator
  - Adds responsibilities to objects dynamically
  *(Already provided in original document)*

- ### Facade
  - Provides unified interface to a set of interfaces
  ```java
  class CPU {
      void freeze() { }
      void jump() { }
      void execute() { }
  }
  
  class Memory {
      void load() { }
  }
  
  class ComputerFacade {
      private CPU cpu;
      private Memory memory;
      
      public ComputerFacade() {
          this.cpu = new CPU();
          this.memory = new Memory();
      }
      
      public void start() {
          cpu.freeze();
          memory.load();
          cpu.execute();
      }
  }
  ```

- ### Flyweight
  - Shares common state between objects
  ```java
  class CharacterFlyweight {
      private char character;
      private String color;
      
      public CharacterFlyweight(char character) {
          this.character = character;
      }
  }
  
  class FlyweightFactory {
      private Map<Character, CharacterFlyweight> flyweights = new HashMap<>();
      
      public CharacterFlyweight getFlyweight(char character) {
          return flyweights.computeIfAbsent(character, CharacterFlyweight::new);
      }
  }
  ```

- ### Proxy
  - Controls access to an object
  ```java
  interface Image {
      void display();
  }
  
  class RealImage implements Image {
      private String filename;
      
      public RealImage(String filename) {
          this.filename = filename;
          loadFromDisk();
      }
      
      private void loadFromDisk() {
          System.out.println("Loading " + filename);
      }
      
      public void display() {
          System.out.println("Displaying " + filename);
      }
  }
  
  class ProxyImage implements Image {
      private RealImage realImage;
      private String filename;
      
      public ProxyImage(String filename) {
          this.filename = filename;
      }
      
      public void display() {
          if (realImage == null) {
              realImage = new RealImage(filename);
          }
          realImage.display();
      }
  }
  ```

## 3. Behavioral Patterns
*Handle object communication and responsibility*

- ### Chain of Responsibility
  - Passes requests along a chain of handlers
  ```java
  abstract class Handler {
      protected Handler next;
      
      public void setNext(Handler next) {
          this.next = next;
      }
      
      public abstract void handleRequest(String request);
  }
  
  class ConcreteHandler extends Handler {
      public void handleRequest(String request) {
          if (canHandle(request)) {
              // Handle request
          } else if (next != null) {
              next.handleRequest(request);
          }
      }
      
      private boolean canHandle(String request) {
          return false; // Implementation specific
      }
  }
  ```

- ### Command
  - Encapsulates a request as an object
  ```java
  interface Command {
      void execute();
  }
  
  class Light {
      public void turnOn() { }
      public void turnOff() { }
  }
  
  class LightOnCommand implements Command {
      private Light light;
      
      public LightOnCommand(Light light) {
          this.light = light;
      }
      
      public void execute() {
          light.turnOn();
      }
  }
  ```

- ### Iterator
  - Accesses elements sequentially
  *(Already provided in original document)*

- ### Mediator
  - Defines simplified communication between classes
  ```java
  interface Mediator {
      void notify(Component sender, String event);
  }
  
  abstract class Component {
      protected Mediator mediator;
      
      public Component(Mediator mediator) {
          this.mediator = mediator;
      }
  }
  
  class Button extends Component {
      public Button(Mediator mediator) {
          super(mediator);
      }
      
      public void click() {
          mediator.notify(this, "click");
      }
  }
  ```

- ### Memento
  - Captures and restores object's internal state
  ```java
  class Memento {
      private String state;
      
      public Memento(String state) {
          this.state = state;
      }
      
      public String getState() {
          return state;
      }
  }
  
  class Originator {
      private String state;
      
      public void setState(String state) {
          this.state = state;
      }
      
      public Memento saveToMemento() {
          return new Memento(state);
      }
      
      public void restoreFromMemento(Memento memento) {
          state = memento.getState();
      }
  }
  ```

- ### Observer
  - Notifies dependents of state changes
  *(Already provided in original document)*

- ### State
  - Alters object behavior when state changes
  *(Already provided in original document)*

- ### Strategy
  - Encapsulates interchangeable algorithms
  *(Already provided in original document)*

- ### Template Method
  - Defines algorithm skeleton, defers steps to subclasses
  *(Already provided in original document)*

- ### Visitor
  - Separates algorithm from object structure
  *(Already provided in original document)*

## Pattern Relationships

### Common Combinations:
1. **Factory Method + Abstract Factory**
   - Abstract Factory often uses Factory Method to create products

2. **Decorator + Composite**
   - Decorator can be viewed as a degenerate Composite with only one component

3. **State + Strategy**
   - Both encapsulate behavior, but State manages transitions while Strategy focuses on algorithms

4. **Chain of Responsibility + Composite**
   - Chain can be implemented using Composite tree structure

5. **Iterator + Composite**
   - Iterator is often used to traverse Composite structures

6. **Observer + Mediator**
   - Mediator can use Observer pattern to notify components

### Selection Criteria:
- **Flexibility Needed**: Strategy, Decorator, Bridge
- **Object Creation**: Factory Method, Abstract Factory, Builder, Prototype
- **Performance Critical**: Flyweight, Proxy
- **System Evolution**: Visitor, Observer, Command
- **Structural Organization**: Composite, Facade, Adapter

[Previous content remains the same until end of patterns section]

## Real-World Examples and Use Cases

### Creational Patterns

#### 1. Factory Method
**Real Example**: Database Connection Factory
```java
interface DatabaseConnection { void connect(); }
class MySQLConnection implements DatabaseConnection {
    public void connect() { /* MySQL specific connection */ }
}
class PostgresConnection implements DatabaseConnection {
    public void connect() { /* Postgres specific connection */ }
}
class ConnectionFactory {
    public DatabaseConnection createConnection(String type) {
        return switch (type) {
            case "mysql" -> new MySQLConnection();
            case "postgres" -> new PostgresConnection();
            default -> throw new IllegalArgumentException();
        };
    }
}
```
**Used In**: JDBC drivers, UI component creation in frameworks

#### 2. Abstract Factory
**Real Example**: Cross-Platform UI Components
```java
// Windows components look one way
class WindowsButton implements Button {
    public void render() { System.out.println("Render Windows-style button"); }
}
class WindowsCheckbox implements Checkbox {
    public void render() { System.out.println("Render Windows-style checkbox"); }
}

// Mac components look different
class MacButton implements Button {
    public void render() { System.out.println("Render Mac-style button"); }
}
class MacCheckbox implements Checkbox {
    public void render() { System.out.println("Render Mac-style checkbox"); }
}

// Factory creates consistent family of components
class MacUIFactory implements GUIFactory {
    public Button createButton() { return new MacButton(); }
    public Checkbox createCheckbox() { return new MacCheckbox(); }
}
```
**Used In**: Cross-platform applications, Game engine rendering systems

#### 3. Builder
**Real Example**: HTTP Request Builder
```java
class HttpRequest {
    private String method;
    private String url;
    private Map<String, String> headers;
    private String body;

    public static class Builder {
        private HttpRequest request = new HttpRequest();

        public Builder method(String method) {
            request.method = method;
            return this;
        }

        public Builder url(String url) {
            request.url = url;
            return this;
        }

        public Builder addHeader(String key, String value) {
            if (request.headers == null) {
                request.headers = new HashMap<>();
            }
            request.headers.put(key, value);
            return this;
        }

        public Builder body(String body) {
            request.body = body;
            return this;
        }

        public HttpRequest build() {
            // Validate request
            return request;
        }
    }
}

// Usage
HttpRequest request = new HttpRequest.Builder()
    .method("POST")
    .url("https://api.example.com/data")
    .addHeader("Content-Type", "application/json")
    .body("{\"key\":\"value\"}")
    .build();
```
**Used In**: HTTP clients, Document builders, Configuration builders

#### 4. Prototype
**Real Example**: Document Template System
```java
interface DocumentTemplate extends Cloneable {
    DocumentTemplate clone();
    void customize(String content);
}

class ReportTemplate implements DocumentTemplate {
    private String header;
    private String footer;
    private String content;

    public ReportTemplate(String header, String footer) {
        this.header = header;
        this.footer = footer;
    }

    public DocumentTemplate clone() {
        return new ReportTemplate(this.header, this.footer);
    }

    public void customize(String content) {
        this.content = content;
    }
}

// Usage
DocumentTemplate monthlyReportTemplate = new ReportTemplate("Monthly Report", "Page 1");
DocumentTemplate januaryReport = monthlyReportTemplate.clone();
januaryReport.customize("January Data...");
```
**Used In**: Document templates, Game object spawning, Configuration templates

#### 5. Singleton
**Real Example**: Database Connection Pool
```java
class ConnectionPool {
    private static volatile ConnectionPool instance;
    private List<Connection> connections;
    private static final int POOL_SIZE = 10;

    private ConnectionPool() {
        connections = new ArrayList<>(POOL_SIZE);
        for (int i = 0; i < POOL_SIZE; i++) {
            connections.add(createConnection());
        }
    }

    public static ConnectionPool getInstance() {
        if (instance == null) {
            synchronized (ConnectionPool.class) {
                if (instance == null) {
                    instance = new ConnectionPool();
                }
            }
        }
        return instance;
    }

    public Connection getConnection() {
        // Return available connection
        return connections.remove(0);
    }
}
```
**Used In**: Configuration managers, Logging systems, Resource pools

### Structural Patterns

#### 6. Adapter
**Real Example**: Third-Party Payment Integration
```java
// Third-party payment service
class PayPalAPI {
    public void makePayment(String paypalEmail, double amount) {
        System.out.println("PayPal payment processed");
    }
}

// Our payment interface
interface PaymentProcessor {
    void processPayment(String userId, double amount);
}

// Adapter to make PayPal work with our system
class PayPalAdapter implements PaymentProcessor {
    private PayPalAPI paypal = new PayPalAPI();

    public void processPayment(String userId, double amount) {
        String paypalEmail = lookupPayPalEmail(userId);
        paypal.makePayment(paypalEmail, amount);
    }

    private String lookupPayPalEmail(String userId) {
        return "user@example.com"; // In reality, would look up in database
    }
}
```
**Used In**: Payment gateways, Legacy system integration, API wrappers

#### 7. Bridge
**Real Example**: Cross-Platform Drawing Application
```java
// Implementation
interface DrawingAPI {
    void drawCircle(double x, double y, double radius);
    void drawRectangle(double x, double y, double width, double height);
}

class SVGDrawing implements DrawingAPI {
    public void drawCircle(double x, double y, double radius) {
        System.out.println("Drawing circle in SVG");
    }
    public void drawRectangle(double x, double y, double width, double height) {
        System.out.println("Drawing rectangle in SVG");
    }
}

class CanvasDrawing implements DrawingAPI {
    public void drawCircle(double x, double y, double radius) {
        System.out.println("Drawing circle in Canvas");
    }
    public void drawRectangle(double x, double y, double width, double height) {
        System.out.println("Drawing rectangle in Canvas");
    }
}

// Abstraction
abstract class Shape {
    protected DrawingAPI drawingAPI;

    protected Shape(DrawingAPI drawingAPI) {
        this.drawingAPI = drawingAPI;
    }

    abstract void draw();
}

class Circle extends Shape {
    private double x, y, radius;

    public Circle(double x, double y, double radius, DrawingAPI drawingAPI) {
        super(drawingAPI);
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    public void draw() {
        drawingAPI.drawCircle(x, y, radius);
    }
}
```
**Used In**: Cross-platform UI toolkits, Device drivers, Graphics systems

#### 8. Composite
**Real Example**: File System Explorer
```java
abstract class FileSystemNode {
    protected String name;
    protected String path;
    abstract long getSize();
    abstract void display(String indent);
}

class File extends FileSystemNode {
    private long size;

    public File(String name, String path, long size) {
        this.name = name;
        this.path = path;
        this.size = size;
    }

    public long getSize() {
        return size;
    }

    public void display(String indent) {
        System.out.println(indent + "📄 " + name + " (" + size + " bytes)");
    }
}

class Directory extends FileSystemNode {
    private List<FileSystemNode> children = new ArrayList<>();

    public Directory(String name, String path) {
        this.name = name;
        this.path = path;
    }

    public void add(FileSystemNode node) {
        children.add(node);
    }

    public long getSize() {
        return children.stream()
            .mapToLong(FileSystemNode::getSize)
            .sum();
    }

    public void display(String indent) {
        System.out.println(indent + "📁 " + name + "/");
        children.forEach(child -> child.display(indent + "  "));
    }
}
```
**Used In**: File systems, Organization charts, GUI component hierarchies

#### 9. Decorator
**Real Example**: Input Stream with Buffering and Compression
```java
interface DataSource {
    void writeData(String data);
    String readData();
}

class FileDataSource implements DataSource {
    private String filename;

    public FileDataSource(String filename) {
        this.filename = filename;
    }

    public void writeData(String data) {
        // Write to file
    }

    public String readData() {
        return "data from file"; // Read from file
    }
}

class EncryptionDecorator implements DataSource {
    private DataSource wrappee;
    
    public EncryptionDecorator(DataSource source) {
        this.wrappee = source;
    }

    public void writeData(String data) {
        String encrypted = encrypt(data);
        wrappee.writeData(encrypted);
    }

    public String readData() {
        String encrypted = wrappee.readData();
        return decrypt(encrypted);
    }

    private String encrypt(String data) {
        // Encryption logic
        return data + "_encrypted";
    }

    private String decrypt(String data) {
        // Decryption logic
        return data.replace("_encrypted", "");
    }
}

class CompressionDecorator implements DataSource {
    private DataSource wrappee;
    
    public CompressionDecorator(DataSource source) {
        this.wrappee = source;
    }

    public void writeData(String data) {
        String compressed = compress(data);
        wrappee.writeData(compressed);
    }

    public String readData() {
        String compressed = wrappee.readData();
        return decompress(compressed);
    }

    private String compress(String data) {
        // Compression logic
        return data + "_compressed";
    }

    private String decompress(String data) {
        // Decompression logic
        return data.replace("_compressed", "");
    }
}
```
**Used In**: I/O streams, UI component enhancement, Middleware

#### 10. Facade
**Real Example**: Video Conversion System
```java
// Complex subsystem classes
class VideoFile {
    private String filename;
    public VideoFile(String filename) { this.filename = filename; }
}

class AudioMixer {
    public void fix(VideoFile video) {
        System.out.println("Fixing audio...");
    }
}

class CodecFactory {
    public void extract(VideoFile file) {
        System.out.println("Extracting codec...");
    }
}

class BitrateReader {
    public void read(VideoFile file, String codec) {
        System.out.println("Reading bitrate...");
    }
    
    public void convert(VideoFile buffer, String codec) {
        System.out.println("Converting bitrate...");
    }
}

// Facade
class VideoConverter {
    public File convertVideo(String filename, String format) {
        VideoFile file = new VideoFile(filename);
        CodecFactory codecFactory = new CodecFactory();
        codecFactory.extract(file);
        
        BitrateReader reader = new BitrateReader();
        reader.read(file, format);
        reader.convert(file, format);
        
        AudioMixer mixer = new AudioMixer();
        mixer.fix(file);
        
        return new File("converted_" + filename);
    }
}

// Client code
VideoConverter converter = new VideoConverter();
File mp4 = converter.convertVideo("youtube.ogg", "mp4");
```
**Used In**: Video/audio processing, Complex system integration, API wrappers

#### 11. Flyweight
**Real Example**: Text Editor Character Rendering
```java
// Flyweight class
class CharacterStyle {
    private String font;
    private int size;
    private String color;

    public CharacterStyle(String font, int size, String color) {
        this.font = font;
        this.size = size;
        this.color = color;
    }

    public void render(char symbol) {
        System.out.println("Rendering '" + symbol + "' in " + font + 
            " size " + size + " color " + color);
    }
}

// Flyweight factory
class CharacterStyleFactory {
    private Map<String, CharacterStyle> styles = new HashMap<>();

    public CharacterStyle getStyle(String font, int size, String color) {
        String key = font + size + color;
        return styles.computeIfAbsent(key, 
            k -> new CharacterStyle(font, size, color));
    }
}

// Context class using flyweight
class Character {
    private char symbol;
    private CharacterStyle style;

    public Character(char symbol, CharacterStyle style) {
        this.symbol = symbol;
        this.style = style;
    }

    public void render() {
        style.render(symbol);
    }
}
```
**Used In**: Text editors, Game particle systems, Symbol tables in compilers

#### 12. Proxy
**Real Example**: Lazy-Loading Image Viewer
```java
interface Image {
    void display();
}

class RealImage implements Image {
    private String filename;
    private byte[] imageData;

    public RealImage(String filename) {
        this.filename = filename;
        loadImageFromDisk();
    }

    private void loadImageFromDisk() {
        System.out.println("Loading image: " + filename);
        // Heavy operation - loading image data
        imageData = new byte[1024]; // Simulated image data
    }

    public void display() {
        System.out.println("Displaying image: " + filename);
    }
}

class ImageProxy implements Image {
    private RealImage realImage;
    private String filename;

    public ImageProxy(String filename) {
        this.filename = filename;
    }

    public void display() {
        if (realImage == null) {
            realImage = new RealImage(filename);
        }
        realImage.display();
    }
}

// Client code
Image image1 = new ImageProxy("photo1.jpg");
Image image2 = new ImageProxy("photo2.jpg");

// Images aren't loaded until needed
image1.display(); // Now photo1.jpg is loaded
```
**Used In**: Virtual proxy (lazy loading), Protection proxy (access control), Remote proxy (remote resources)

### Behavioral Patterns

#### 13. Chain of Responsibility (continued)
```java
class ValidationHandler extends RequestHandler {
    public void handleRequest(Request request) {
        if (!request.isValid()) {
            throw new ValidationException("Invalid request");
        }
        
        if (next != null) {
            next.handleRequest(request);
        }
    }
}

// Usage
class SecuritySystem {
    private RequestHandler chain;
    
    public SecuritySystem() {
        // Build the chain
        chain = new AuthenticationHandler();
        RequestHandler auth = new AuthorizationHandler();
        RequestHandler validation = new ValidationHandler();
        
        chain.setNext(auth);
        auth.setNext(validation);
    }
    
    public void processRequest(Request request) {
        chain.handleRequest(request);
    }
}
```
**Used In**: Web server request processing, middleware chains, event handling systems

#### 14. Command
**Real Example**: Smart Home Automation
```java
// Commands
interface Command {
    void execute();
    void undo();
}

// Smart devices
class Light {
    private String location;
    private boolean isOn = false;
    
    public Light(String location) {
        this.location = location;
    }
    
    public void turnOn() {
        isOn = true;
        System.out.println(location + " light turned on");
    }
    
    public void turnOff() {
        isOn = false;
        System.out.println(location + " light turned off");
    }
}

class Thermostat {
    private int temperature;
    
    public void setTemperature(int temperature) {
        this.temperature = temperature;
        System.out.println("Temperature set to " + temperature);
    }
}

// Concrete commands
class LightCommand implements Command {
    private Light light;
    private boolean previousState;
    
    public LightCommand(Light light) {
        this.light = light;
    }
    
    public void execute() {
        previousState = light.isOn;
        light.turnOn();
    }
    
    public void undo() {
        if (!previousState) {
            light.turnOff();
        }
    }
}

class ThermostatCommand implements Command {
    private Thermostat thermostat;
    private int previousTemp;
    private int newTemp;
    
    public ThermostatCommand(Thermostat thermostat, int temperature) {
        this.thermostat = thermostat;
        this.newTemp = temperature;
    }
    
    public void execute() {
        previousTemp = thermostat.getTemperature();
        thermostat.setTemperature(newTemp);
    }
    
    public void undo() {
        thermostat.setTemperature(previousTemp);
    }
}

// Remote control (invoker)
class SmartHomeController {
    private List<Command> commands = new ArrayList<>();
    
    public void addCommand(Command command) {
        commands.add(command);
    }
    
    public void executeCommands() {
        for (Command command : commands) {
            command.execute();
        }
    }
    
    public void undoLastCommand() {
        if (!commands.isEmpty()) {
            Command command = commands.remove(commands.size() - 1);
            command.undo();
        }
    }
}

// Usage
SmartHomeController controller = new SmartHomeController();
Light livingRoom = new Light("Living Room");
Thermostat thermostat = new Thermostat();

controller.addCommand(new LightCommand(livingRoom));
controller.addCommand(new ThermostatCommand(thermostat, 72));
controller.executeCommands();
```
**Used In**: GUI actions, Transaction systems, Smart home automation

#### 15. Mediator
**Real Example**: Air Traffic Control System
```java
// Mediator
interface AirTrafficControl {
    void registerFlight(Flight flight);
    void sendLandingPermission(Flight flight);
    void requestLanding(Flight flight);
}

class Airport implements AirTrafficControl {
    private Map<String, Flight> flights = new HashMap<>();
    private Queue<Flight> landingQueue = new LinkedList<>();
    
    public void registerFlight(Flight flight) {
        flights.put(flight.getFlightNumber(), flight);
    }
    
    public void requestLanding(Flight flight) {
        System.out.println("Flight " + flight.getFlightNumber() + " requesting landing");
        landingQueue.offer(flight);
        checkLandingQueue();
    }
    
    public void sendLandingPermission(Flight flight) {
        flight.receiveLandingPermission();
    }
    
    private void checkLandingQueue() {
        while (!landingQueue.isEmpty()) {
            Flight flight = landingQueue.poll();
            sendLandingPermission(flight);
        }
    }
}

// Colleague
class Flight {
    private String flightNumber;
    private AirTrafficControl atc;
    
    public Flight(String flightNumber, AirTrafficControl atc) {
        this.flightNumber = flightNumber;
        this.atc = atc;
        atc.registerFlight(this);
    }
    
    public void requestLanding() {
        atc.requestLanding(this);
    }
    
    public void receiveLandingPermission() {
        System.out.println("Flight " + flightNumber + " received landing permission");
    }
    
    public String getFlightNumber() {
        return flightNumber;
    }
}

// Usage
AirTrafficControl atc = new Airport();
Flight flight1 = new Flight("AA123", atc);
Flight flight2 = new Flight("UA456", atc);

flight1.requestLanding();
flight2.requestLanding();
```
**Used In**: Air traffic control, Chat rooms, GUI form controls

#### 16. Memento
**Real Example**: Text Editor with Undo Feature
```java
// Memento
class EditorState {
    private final String content;
    private final int cursorPosition;
    
    public EditorState(String content, int cursorPosition) {
        this.content = content;
        this.cursorPosition = cursorPosition;
    }
    
    public String getContent() {
        return content;
    }
    
    public int getCursorPosition() {
        return cursorPosition;
    }
}

// Originator
class TextEditor {
    private String content;
    private int cursorPosition;
    
    public void type(String text) {
        content = (content == null ? "" : content) + text;
        cursorPosition += text.length();
    }
    
    public void setCursor(int position) {
        this.cursorPosition = position;
    }
    
    public EditorState save() {
        return new EditorState(content, cursorPosition);
    }
    
    public void restore(EditorState state) {
        this.content = state.getContent();
        this.cursorPosition = state.getCursorPosition();
    }
    
    public String getContent() {
        return content;
    }
}

// Caretaker
class History {
    private Stack<EditorState> states = new Stack<>();
    
    public void push(EditorState state) {
        states.push(state);
    }
    
    public EditorState pop() {
        if (!states.isEmpty()) {
            return states.pop();
        }
        return null;
    }
}

// Usage
TextEditor editor = new TextEditor();
History history = new History();

editor.type("Hello");
history.push(editor.save());

editor.type(" World");
history.push(editor.save());

editor.type("!");

// Undo last change
editor.restore(history.pop());
System.out.println(editor.getContent()); // Prints: "Hello World"
```
**Used In**: Text editors, Version control systems, Game save states

[Previous patterns continue as before...]

### Selection Guide

#### When to Use Each Pattern:

1. **Creational Patterns**
   - Use **Factory Method** when:
     - You don't know exact types and dependencies of objects
     - You want to provide hooks for extending components
   - Use **Abstract Factory** when:
     - You need families of related objects
     - You want to enforce consistency across products
   - Use **Builder** when:
     - You need to create complex objects step by step
     - You want to prevent "telescoping constructor" problem
   - Use **Prototype** when:
     - You need to copy/clone objects without coupling to their classes
   - Use **Singleton** when:
     - You need exactly one instance of a class
     - You need stricter control over global variables

2. **Structural Patterns**
   - Use **Adapter** when:
     - You need to work with incompatible interfaces
     - You want to reuse existing classes with incompatible interfaces
   - Use **Bridge** when:
     - You want to avoid permanent binding between abstraction and implementation
     - Both abstraction and implementation need to be extended independently
   - Use **Composite** when:
     - You need to implement tree-like object structures
     - You want clients to treat individual objects and compositions uniformly
   - Use **Decorator** when:
     - You need to add responsibilities dynamically
     - Extension by subclassing would be impractical
   - Use **Facade** when:
     - You need a simplified interface to a complex subsystem
     - You want to layer your subsystems
   - Use **Flyweight** when:
     - You need to support large numbers of fine-grained objects efficiently
   - Use **Proxy** when:
     - You need to control access to an object
     - You need to provide a placeholder for another object

3. **Behavioral Patterns**
   - Use **Chain of Responsibility** when:
     - More than one object may handle a request
     - You want to issue a request without specifying the handler
   - Use **Command** when:
     - You need to parameterize objects with operations
     - You need to queue, specify or execute requests at different times
   - Use **Iterator** when:
     - You need to access elements sequentially without exposing structure
   - Use **Mediator** when:
     - Objects communicate in complex ways
     - You want to reduce coupling between objects
   - Use **Memento** when:
     - You need to capture object's internal state
     - You need to implement undo/redo operations
   - Use **Observer** when:
     - Changes to one object might require changing others
     - You need to notify other objects without making assumptions about them
   - Use **State** when:
     - Object behavior depends on its state
     - You need to avoid large conditional statements
   - Use **Strategy** when:
     - You need different variants of an algorithm
     - You want to avoid exposing algorithm-specific data structures
   - Use **Template Method** when:
     - You want to let clients extend only particular steps of an algorithm
     - You have several classes that contain similar algorithms
   - Use **Visitor** when:
     - You need to perform operations on all elements of a complex object structure
     - You want to add new operations without changing the classes of the elements


1. "Wraps an object and provides a different interface to it"
- **Adapter Pattern**: Converts one interface into another that clients expect

2. "Subclasses decide how to implement steps in an algorithm"
- **Template Method Pattern**: Defines skeleton of algorithm, letting subclasses override specific steps

3. "Subclasses decide which concrete classes to create"
- **Factory Method Pattern**: Creates objects without specifying exact class

4. "Ensures one and only one object is created"
- **Singleton Pattern**: Guarantees a class has only one instance

5. "Encapsulates interchangeable behaviors and uses delegation to decide which one to use"
- **Strategy Pattern**: Defines family of algorithms and makes them interchangeable

6. "Clients treat collections of objects and individual objects uniformly"
- **Composite Pattern**: Composes objects into tree structures

7. "Encapsulates state-based behaviors and uses delegation to switch between behaviors"
- **State Pattern**: Allows object to alter behavior when state changes

8. "Provides a way to traverse a collection of objects without exposing its implementation"
- **Iterator Pattern**: Accesses elements sequentially without exposing underlying structure

9. "Simplifies the interface of a set of classes"
- **Facade Pattern**: Provides unified interface to a set of interfaces

10. "Wraps an object to provide new behavior"
- **Decorator Pattern**: Adds responsibilities to objects dynamically

11. "Allows a client to create families of objects without specifying their concrete classes"
- **Abstract Factory Pattern**: Creates families of related objects

12. "Allows objects to be notified when state changes"
- **Observer Pattern**: Defines one-to-many dependency between objects

13. "Encapsulates a request as an object"
- **Command Pattern**: Encapsulates request as an object
