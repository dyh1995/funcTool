/*
 冒泡排序: 相邻排序，后项向前项冒泡。

 不带flag的冒泡排序时间复杂度:O(n2),
 带flag的冒泡排序时间复杂度:
 正序时(最好情况) 时间复杂度O(n)
 逆序时(最坏情况) 时间复杂度O(n2)
 */
/* 不带flag的冒泡排序 比较和交换次数都不少*/
function bubbleSort_1(arr){

    var i, j, temp;

    for(i = 0; i < arr.length; i++){			/* 下标i从前向后 */
        for(j = arr.length - 1; j >= i; j--){	/* 下标j从后向前 */

            if(arr[j] > arr[j+1]){
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }

    alert(arr);
}
/* 带flag的冒泡排序   比较次数较少，交换次数不少*/
function bubbleSort_2(arr){

    var i, j, temp, flag = 0;	/* flag为0，不退出循环 */

    for(i = 0; i < arr.length && !flag; i++){			/* 下标i从前向后 */
        flag = 1;

        for(j = arr.length -1; j >= i; j--){			/* 下标j从后向前 */
            if(arr[j] > arr[j+1]){
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;

                flag = 0;
            }
        }
    }

    alert(arr);
}



/*
 简单选择排序: 第一次从R[0]~R[n-1]中选取最小值，与R[0]交换，
 第二次从R[1]~R[n-1]中选取最小值，与R[1]交换，....，
 第i次从R[i-1]~R[n-1]中选取最小值，与R[i-1]交换，.....，
 第n-1次从R[n-2]~R[n-1]中选取最小值，与R[n-2]交换，
 总共通过n-1次，得到一个按排序码从小到大排列的有序序列

 特点：交换次数相当少，比较次数不少，时间复杂度: O(n2),性能上略优于不带flag的冒泡排序,简单选择排序是一种不稳定的排序方法
 */
function selectSort(arr){

    var i, j, min, temp;

    for(i = 0; i < arr.length; i++){
        min = i;	/* 将当前下标定义为最小值下标 */

        for(j = i+1; j <= arr.length; j++){
            if(arr[min] > arr[j]){
                min = j;
            }
        }

        if(i != min){
            temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }

    alert(arr);
}



/*
 直接插入排序: 每次从无序表中取出第一个元素，把它插入到有序表的合适位置，使有序表仍然有序
 每步将一个待排序的记录按其关键字的大小插到前面已经排序的序列中的适当位置，直到全部记录插入完毕为止

 特点：时间复杂度: O(n2),性能上略优于冒泡排序，直接插入排序属于稳定的排序
 */
function insertSort(arr){

    var i, j, temp;

    for(i = 1; i < arr.length; i++){
        if(arr[i] < arr[i-1]){							/* 判断后项是否小于前项 */
            temp = arr[i];								/* 设置临时变量(相当于哨兵),将后项存入temp中 */
            for(j = i-1; arr[j] > temp && j > -1; j--){	/* j为前项 *///i=1 j=0 temp=1
                arr[j+1] = arr[j];						/* 后移 */
            }
            arr[j+1] = temp;								/* 插入至正确位置 */
        }
    }

    alert(arr);
}



/*
 希尔排序: 是直接插入排序算法的一种更高效的改进版本，希尔排序是非稳定排序算法
 希尔排序是把记录按下标的一定增量分组，对每组使用直接插入排序算法排序；
 随着增量逐渐减少，每组包含的关键词越来越多，当增量减至1时，整个文件恰被分成一组，算法便终止

 特点：时间复杂度: 希尔排序的时间复杂度与增量序列的选取有关，例如希尔增量时间复杂度为O(n2)，
 而Hibbard增量的希尔排序的时间复杂度为O(n3/2)，希尔排序时间复杂度的下界是n(log2n)
 */
function shellSort(arr){

    var increment = arr.length;
    var i, j, temp;	/*temp哨兵*/

    do{
        increment = increment/3+1;	/* 增量序列 */

        for(i = increment; i < arr.length; i++){
            if(arr[i] < arr[i-increment]){
                /* 需要将arr[i]插入有序增量子表 */

                temp = arr[i];
                for(j = i-increment; temp < arr[j] && j > -1; j -= increment){
                    arr[j+increment] = arr[j];	/* 后移 */
                }
                arr[j+increment] = temp;	/* 插入 */
            }
        }
    }while(increment > 2);

    alert(arr);
}



/*
 归并排序: 将已有序的子序列合并，得到完全有序的序列；
 即先使每个子序列有序，再使子序列段间有序。
 若将两个有序表合并成一个有序表，称为二路归并

 特点：时间复杂度: O(nlogn),稳定的排序算法
 */

/*
 递归实现
 */
function mergeSort(arr){
    msort(arr,arr,0,arr.length-1);

    alert(arr);
}

/*
 * 将SR[]归并为TR1[]
 */
function msort(sr, tr, start, end){
    /* 这里的sr和tr1是数组指针，改变sr,tr就会改变L */

    var mid;
    var tempArr;

    if(start == end){
        tr[start] = sr[start];
    }else{
        mid = (start+end)/2;			/* 将sr[s..e]平分为sr[s...m]和sr[m+1...e] 这里分为了0~4和5~9*/
        msort(sr, tempArr, start, mid);		/* 递归将sr[s...m]归并为有序的tempArr[s...m] */
        msort(sr, tempArr, mid+1, end);		/* 递归将sr[m+1...e]归并为有序的tempArr[m+1...e] */

        merge(tempArr, tr, start, mid, end);	/* 将tempArr[s...m]和tempArr[m+1...e]归并到tr[s...e] */
    }
}

/*
 * 将sr[start...mid]和sr[mid+1...end]归并为tr[start...end]
 */
function merge(sr, tr, start, mid, end){
    var j, k, l;

    for(j = mid+1, k = start; start <= mid && j <= end; k++){
        if(sr[start] < sr[j]){
            tr[k] = sr[start++];
        }else{
            tr[k] = sr[j++];
        }
    }

    /* 将归并剩下的数组数据,移动到tr后面 */
    if(start <= mid){
        for(l = 0; l <= mid-start; l++){
            tr[k+l] = sr[start+l];
        }
    }

    if(j <= end){
        for(l = 0; l <= end-j; l++){
            tr[k+l] = sr[j+l];
        }
    }
}




/*
 快速排序: 通过一趟排序将要排序的数据分割成独立的两部分，
 其中一部分的所有数据都比另外一部分的所有数据都要小，
 然后再按此方法对这两部分数据分别进行快速排序，
 整个排序过程可以递归进行，以此达到整个数据变成有序序列

 特点：时间复杂度: 最好O(nlogn),最差O(n2)不稳定的排序算法
 */

/* 快速排序 */
var quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];
　　var left = [];
　　var right = [];
　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　
　　return quickSort(left).concat([pivot], quickSort(right));
};
