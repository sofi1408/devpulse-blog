---
title: "Advanced TypeScript Patterns for Production React Apps"
date: "2025-04-18"
excerpt: "Battle-tested TypeScript patterns that make your React codebase more maintainable, type-safe, and developer-friendly at scale."
category: "TypeScript"
tags: ["TypeScript", "React", "Architecture", "Patterns"]
author: "DevPulse Team"
featured: false
coverImage: "/images/typescript.jpg"
---

## Beyond Basic Types

Most TypeScript in React codebases stops at typing props and state. But TypeScript's real power emerges when you use it to **enforce architectural decisions** — making invalid states unrepresentable, impossible flows un-compilable, and refactoring safe.

Here are the patterns we use daily in production React applications.

## Pattern 1: Discriminated Unions for State Machines

Instead of juggling boolean flags, model your component state as a union:

```typescript
// ❌ Boolean soup — what does loading + error mean?
interface BadState {
  loading: boolean;
  error: string | null;
  data: User[] | null;
}

// ✅ Discriminated union — exactly one state at a time
type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: T };

function UserList() {
  const [state, setState] = useState<FetchState<User[]>>({
    status: 'idle'
  });

  // TypeScript narrows the type in each branch
  switch (state.status) {
    case 'loading': return <Spinner />;
    case 'error':   return <ErrorCard error={state.error} />;
    case 'success': return <List items={state.data} />;
    default:        return <EmptyState />;
  }
}
```

## Pattern 2: Branded Types for Domain Safety

Prevent mixing up primitive values that represent different concepts:

```typescript
// Create branded types for IDs
type UserId = string & { readonly __brand: 'UserId' };
type OrderId = string & { readonly __brand: 'OrderId' };

// Helper to create branded values
function userId(id: string): UserId { return id as UserId; }
function orderId(id: string): OrderId { return id as OrderId; }

// Now the compiler catches mix-ups
function getOrder(id: OrderId) { /* ... */ }
function getUser(id: UserId) { /* ... */ }

const uid = userId('user_123');
const oid = orderId('order_456');

getOrder(uid); // ❌ Type error! Can't pass UserId where OrderId expected
getOrder(oid); // ✅ Correct
```

## Pattern 3: Builder Pattern for Complex Components

When components have many configuration options, use the builder pattern:

```typescript
class FormBuilder<T extends Record<string, unknown>> {
  private fields: FormField[] = [];
  private validators: Validator<T>[] = [];

  addField<K extends keyof T>(
    name: K,
    config: FieldConfig<T[K]>
  ): this {
    this.fields.push({ name: String(name), ...config });
    return this;
  }

  addValidator(fn: Validator<T>): this {
    this.validators.push(fn);
    return this;
  }

  build(): FormConfig<T> {
    return {
      fields: this.fields,
      validators: this.validators,
    };
  }
}

// Usage — fully type-safe
const loginForm = new FormBuilder<LoginData>()
  .addField('email', { type: 'email', required: true })
  .addField('password', { type: 'password', minLength: 8 })
  .addValidator(data => data.email.includes('@'))
  .build();
```

## Pattern 4: Const Assertions for Exhaustive Checks

Use `as const` and `satisfies` to create type-safe configuration objects:

```typescript
const ROUTES = {
  home: '/',
  blog: '/blog',
  about: '/about',
  post: (slug: string) => `/blog/${slug}`,
} as const satisfies Record<string, string | ((...args: any[]) => string)>;

type RouteName = keyof typeof ROUTES;

// Exhaustive navigation handler
function navigate(route: RouteName) {
  const path = ROUTES[route];
  // TypeScript ensures every route is handled
}
```

## Key Takeaways

Good TypeScript isn't about adding types everywhere — it's about designing types that make wrong code fail to compile. Start with discriminated unions for state, branded types for IDs, and exhaustive checks for enums. Your future self will thank you during the next big refactor.
