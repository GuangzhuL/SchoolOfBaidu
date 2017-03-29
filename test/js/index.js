    for (var i = 0; i < lis.length - 1; i++) {
        for (var j = 0; j < lis.length - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                var temp;
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }