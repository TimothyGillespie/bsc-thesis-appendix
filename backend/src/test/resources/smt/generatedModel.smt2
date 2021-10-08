(
  ;; universe for NAryTree:
  ;;   NAryTree!val!2 NAryTree!val!1 NAryTree!val!0 NAryTree!val!3
  ;; -----------
  ;; definitions for universe elements:
  (declare-fun NAryTree!val!2 () NAryTree)
  (declare-fun NAryTree!val!1 () NAryTree)
  (declare-fun NAryTree!val!0 () NAryTree)
  (declare-fun NAryTree!val!3 () NAryTree)
  ;; cardinality constraint:
  (forall ((x NAryTree))
          (or (= x NAryTree!val!2)
              (= x NAryTree!val!1)
              (= x NAryTree!val!0)
              (= x NAryTree!val!3)))
  ;; -----------
  (define-fun %t/2 () NAryTree
    NAryTree!val!0)
  (define-fun %%t/2_x2 () NAryTree
    NAryTree!val!2)
  (define-fun %t_base/0 () NAryTree
    NAryTree!val!3)
  (define-fun %%t/2_x1 () NAryTree
    NAryTree!val!1)
  (define-fun definitionDepthNumber1Arity1InputTypesNAryTreeOutputTypeIntOtherwise () Bool
    (or (not (<= (depth %%t/2_x1) (depth %%t/2_x2)))
    (= (depth %t/2) (depth %%t/2_x2))))
  (define-fun definitionDepthNumber1Arity1InputTypesNAryTreeOutputTypeInt1 () Bool
    (or (<= (depth %%t/2_x1) (depth %%t/2_x2)) (= (depth %t/2) (depth %%t/2_x1))))
  (define-fun definitionDepthNumber2Arity1InputTypesNAryTreeOutputTypeIntOtherwise () Bool
    (= (depth %t_base/0) 1))
  (define-fun definitionSizeNumber2Arity1InputTypesNAryTreeOutputTypeIntOtherwise () Bool
    (= (size %t_base/0) 1))
  (define-fun inductionHypothesis1 () Bool
    (<= (depth %%t/2_x2) (size %%t/2_x2)))
  (define-fun statementToProve () Bool
    (not (<= (depth %t/2) (size %t/2))))
  (define-fun definitionSizeNumber1Arity1InputTypesNAryTreeOutputTypeIntOtherwise () Bool
    (= (size %t/2) (+ 1 (size %%t/2_x1) (size %%t/2_x2))))
  (define-fun inductionHypothesis0 () Bool
    (<= (depth %%t/2_x1) (size %%t/2_x1)))
  (define-fun inductiveBasis () Bool
    (<= (depth %t_base/0) (size %t_base/0)))
  (define-fun depth ((x!0 NAryTree)) Int
    (ite (= x!0 NAryTree!val!2) (- 2)
    (ite (= x!0 NAryTree!val!3) 1
      0)))
  (define-fun size ((x!0 NAryTree)) Int
    (ite (= x!0 NAryTree!val!0) (- 1)
    (ite (= x!0 NAryTree!val!1) 0
    (ite (= x!0 NAryTree!val!3) 1
      (- 2)))))
)