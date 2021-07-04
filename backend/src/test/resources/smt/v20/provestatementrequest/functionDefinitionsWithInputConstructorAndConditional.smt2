(assert ( ! (forall ((a BTree) (b BTree)) (=> (> (depth a) (depth b)) (= (depth (c a b)) (depth a)))) :named depthArity1Number1))
(assert ( ! (forall ((a BTree) (b BTree)) (=> (not (> (depth a) (depth b))) (= (depth (c a b)) (depth b)))) :named depthArity1Else))
