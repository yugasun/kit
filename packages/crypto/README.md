# @ygkit/crypto

```ts
import { SHA256 } from '@ygkit/crypto';

const text = "";
const hex = SHA256.update(text).digest("hex");
// => "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"

const data = new Uint8Array(0);
const hash = SHA256.update(data).digest();
// => <Uint8Array e3 b0 c4 42 98 fc 1c 14 9a fb f4 c8 99 6f b9 24 27 ae 41 e4 64 9b 93 4c a4 95 99 1b 78 52 b8 55>
```

## License

MIT