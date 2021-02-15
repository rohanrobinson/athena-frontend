
def evaluateGaussianBayes(y_actual,y_pred, class_label ):#= Gaussian_Bayes(x_test)):
    ## Your code here
   # print("HELLO",x_train[0])
     #Class Label is Gaussian
    false_positive = 0 #B
    false_negative = 0 #C
    true_positive = 0 #A
    true_negative = 0 #D
    accuracy = 0
    for i in range(len(y_actual)):
        #print(len(y_actual), len(class_label))
        if (y_actual[i] == y_pred[i]) & (y_actual[i] != class_label[i]): #false positive
            false_positive+=1
        elif (y_actual[i] == y_pred[i]) & (y_actual[i] == class_label[i]): #true positive
            true_positive+=1
        elif  (y_actual[i] != y_pred[i]) & (y_actual[i] == class_label[i]): #false negative
            false_negative+=1
        else: #true negative
            true_negative+=1
    #A+D/A+B+C+D
    #Recall = TP/ (TP+FN) 
    Recall = true_positive / (true_positive+false_negative)
    #Precision = TP/(TP+FP) 
    Precision = true_positive / (true_positive+false_positive)
    #F1 = 2 * (precision * recall) / (precision + recall)
    F1score = (2 * Precision * Recall) / (Precision + Recall)
    accuracy = (true_positive + true_negative) / (true_positive + false_positive + false_negative + true_negative) 
    print("Accuracy: ",accuracy," and F1 Score: ", F1score)
    return false_positive, false_negative, true_positive, true_negative, accuracy, F1score
#evaluateGaussianBayes(y_test, Actual_data)

def evaluateMultinomialNaiveBayes(y_actual,y_pred, class_label ): #= Bayes(x_test)):
    ## Your code here
   # print("HELLO",x_train[0])
    #class_label = Bayes(x_test) #Class Label is NaiveBayes
    false_positive = 0 #B
    false_negative = 0 #C
    true_positive = 0 #A
    true_negative = 0 #D
    accuracy = 0
    for i in range(len(y_actual)):
        #print(len(y_actual), len(class_label))
        if (y_actual[i] == y_pred[i]) & (y_actual[i] != class_label[i]): #false positive
            false_positive+=1
        elif (y_actual[i] == y_pred[i]) & (y_actual[i] == class_label[i]): #true positive
            true_positive+=1
        elif  (y_actual[i] != y_pred[i]) & (y_actual[i] == class_label[i]): #false negative
            false_negative+=1
        else: #true negative
            true_negative+=1
    #A+D/A+B+C+D
    #Recall = TP/ (TP+FN) 
    Recall = true_positive / (true_positive+false_negative)
    #Precision = TP/(TP+FP) 
    Precision = true_positive / (true_positive+false_positive)
    #F1 = 2 * (precision * recall) / (precision + recall)
    F1score = (2 * Precision * Recall) / (Precision + Recall)
    accuracy = (true_positive + true_negative) / (true_positive + false_positive + false_negative + true_negative) 
    print("Accuracy: ",accuracy," and F1 Score: ", F1score)
    return false_positive, false_negative, true_positive, true_negative, accuracy, F1score
    '''
print("GaussianBayes")
print(evaluateGaussianBayes(y_test, Actual_data))
print("MultinomialBayes")
print(evaluateMultinomialNaiveBayes(y_test, Actual_data))
'''