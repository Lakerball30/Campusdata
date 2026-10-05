Most difficult: One event has capacity 0, and you can't divide by zero when finding the average fill rate.
What I did: Fillrate returns Null when a capacity is 0. The loop skips any  event with null. so instead of dividing by 0 it returns Null
Evidence: In my test "capacity zero skipped", one event at 50% and one with capacity 0 gives an average of 0.5. It passes.