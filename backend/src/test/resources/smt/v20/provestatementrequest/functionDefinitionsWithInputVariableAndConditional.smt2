(assert ( ! (forall ((a Int) (b Int)) (=> (> a b) (= (max a b) a))) :named maxArity2Number1))
(assert ( ! (forall ((a Int) (b Int)) (=> (not (> a b)) (= (max a b) b))) :named maxArity2Else))
