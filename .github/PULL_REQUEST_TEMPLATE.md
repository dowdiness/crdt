## Summary

<!-- 1-3 bullet points: what changed and why -->

-

## Reuse check

<!-- Required when adding new functions, methods, helpers, or types. Skip only for pure docs/config changes. -->

Existing APIs considered:

| API | Location | Reused? | Reason if not |
|-----|----------|---------|---------------|
| | | | |

New helpers added (if any):

- `new_helper_name` — why this does not duplicate an existing API:

## Test plan

- [ ] `NEW_MOON_MOD=0 moon check` passes
- [ ] `NEW_MOON_MOD=0 moon test` passes
- [ ] `git diff *.mbti` reviewed for unintended API surface changes
- [ ] JS rebuild run if web is affected (`cd examples/web && npm run build`)

## Validation

```bash
NEW_MOON_MOD=0 moon check && NEW_MOON_MOD=0 moon test
```
