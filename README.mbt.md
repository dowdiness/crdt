# dowdiness/crdt

## Eg-Walker CRDT Editor in MoonBit

An implementation of the eg-walker CRDT algorithm for collaborative text editing, using the FugueMax sequence CRDT and retreat-advance-apply merge strategy.

## Building

```sh
moon build --target js
cd web
npm install
npm run dev
```

## References

- [Eg-walker paper](https://arxiv.org/abs/2409.14252)
