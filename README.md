
# Pipelineer

A generic pipeline / chain of responsibility / middleware library build with Typescript.


## Installation

Install pipelineer with npm / yarn

```bash
  npm install pipelineer
  yarn add pipelineer
```
    
## Features

- Supports Javascript and Typescript
- Strongly typed with Typescript
- Lightweight
- No dependencies


## Usage/Examples

Start by writing the middlewares by implementing or instancing the PipelineMiddleware interface.

```typescript
import { PipelineMiddleware } from 'pipelineer';

class ExampleMiddleware implements PipelineMiddleware<string, string> {
    exec(request: string, next: (request: string) => string | undefined) : string {
        return "my pretty example";
    }
}
```

```javascript
const ExampleMiddleware = {
    exec: (request, next) => "my pretty example";
}
```

Then, create a PipelineFactory and add your middlewares to it.

```typescript
import { PipelineFactory } from 'pipelineer';

const manager = new PipelineFactory<A, B>();
manager.push(middleware1);
manager.push(middleware2);
```

Finally, once you added all middlewares, build the pipeline and execute it.

```typescript
const pipeline = manager.build();
const result = pipeline.exec(request);
```

