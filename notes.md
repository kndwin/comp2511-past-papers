# Patterns
1. Strategy
	- Dynamically change strageties at runtime
	- Add/remove strategies at will
	- Limited logic around changing stragegies
2. State
	- States
	- Actions -> cause transitions
	- Logic around those cations
3. Composite
	- Compound nodes
	- Left nodes
	- Tree hierarchy
	- You don't care whether you're talking to a leaf or a compound node
4. Observer
	- Thing being observed (subject, consumer, subscriber, listener)
	- Thing doing the observing (observer, producer)
	- Method of notification (push/pull)
	- A change in state causes the updating/notification
5. Factory
	- Create other objects - have some logic around creation
	-  Abstraction creation in some way
6. Decorator
	- Dynamically add functionality
	- "Layering" / wrapping
	- Can decorate to an interface, not an implementation
7. Template
	- Series of steps
	- Some steps are abstractly defined, some concretely defined
	- "Hook" methods
8. Visitor
	- Seperate algorithm and implementation
	- Add functionality to an existing system (legacy)
	- Build in "hook" into the system to latch functionality on
9. Iterator
	- Abstract traversal from container/algorithm
	- Access elements in a linear order