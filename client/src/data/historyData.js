
export const historyData = [
  {
    id: 1,
    sourceCode: "console.log('Hello, World!');",
    sourceLanguage: "JavaScript",
    targetLanguage: "Python",
    action: "translation",
    outputCode: "print('Hello, World!')",
    timestamp: "2023-10-01 10:00:00",
  },
  {
    id: 2,
    sourceCode: "def greet():\n    print('Hello, World!')",
    sourceLanguage: "Python",
    targetLanguage: "JavaScript",
    action: "translation",
    outputCode: "function greet() {\n    console.log('Hello, World!');\n}",
    timestamp: "2023-10-02 11:30:00",
  },
  {
    id: 3,
    sourceCode: "function add(a, b) {\n    return a + b;\n}",
    sourceLanguage: "JavaScript",
    targetLanguage: "Python",
    action: "translation",
    outputCode: "def add(a, b):\n    return a + b",
    timestamp: "2023-10-03 14:15:00",
  },

  {
    id: 4,
    sourceCode:
      "def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n - 1)",
    sourceLanguage: "Python",
    targetLanguage: "JavaScript",
    action: "translation",
    outputCode:
      "function factorial(n) {\n    if (n === 0) {\n        return 1;\n    } else {\n        return n * factorial(n - 1);\n    }\n}",
    timestamp: "2023-10-04 09:45:00",
  },
  {
    id: 5,
    explanation:
      "This function calculates the factorial of a given number using recursion.",
    sourceCode:
      "def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n - 1)",
    sourceLanguage: "Python",
    action: "code_explanation",
    timestamp: "2023-10-05 16:20:00",
  },
  {
    id: 6,
    optimization:
      "Optimized the function to use an iterative approach instead of recursion for better performance.",
    sourceCode:
      "def factorial(n):\n    if n == 0:\n        return 1\n    else:\n        return n * factorial(n - 1)",
    sourceLanguage: "Python",
    action: "code_optimization",
    timestamp: "2023-10-06 13:10:00",
  },

  {
    id: 7,
    explanation:
      "This function implements the bubble sort algorithm, which repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    sourceCode:
      "function bubbleSort(arr) {\n    let n = arr.length;\n    for (let i = 0; i < n - 1; i++) {\n        for (let j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                let temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n            }\n        }\n    }\n    return arr;\n}",
    sourceLanguage: "JavaScript",
    action: "complexity_analysis",
    timestamp: "2023-10-07 10:30:00",
  },
  {
    id: 8,
    sourceCode:
      "def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    sourceLanguage: "Python",
    action: "complexity_analysis",
    timestamp: "2023-10-08 15:45:00",
  },
  {
    id: 9,
    sourceCode:
      "function quickSort(arr) {\n    if (arr.length <= 1) {\n        return arr;\n    }\n    const pivot = arr[arr.length - 1];\n    const left = [];\n    const right = [];\n    for (let i = 0; i < arr.length - 1; i++) {\n        if (arr[i] < pivot) {\n            left.push(arr[i]);\n        } else {\n            right.push(arr[i]);\n        }\n    }\n    return [...quickSort(left), pivot, ...quickSort(right)];\n}",
    sourceLanguage: "JavaScript",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    action: "complexity_analysis",
    timestamp: "2023-10-09 12:00:00",
  },
  {
    id: 10,
    sourceCode:
      "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left_half = merge_sort(arr[:mid])\n    right_half = merge_sort(arr[mid:])\n    return merge(left_half, right_half)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] < right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result",
    sourceLanguage: "Python",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    action: "complexity_analysis",
    timestamp: "2023-10-10 14:30:00",
  },
  {
    id: 11,
    explanation:
      "This function implements the merge sort algorithm, which is a divide-and-conquer sorting algorithm. It recursively divides the input array into two halves, sorts each half, and then merges the sorted halves back together.",
    sourceCode:
      "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left_half = merge_sort(arr[:mid])\n    right_half = merge_sort(arr[mid:])\n    return merge(left_half, right_half)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] < right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result",
    sourceLanguage: "Python",
    action: "code_explanation",
    timestamp: "2023-10-10 14:30:00",
  },
  {
    id: 12,
    optimization:
      "The function has been optimized to reduce the number of comparisons and improve performance by using a more efficient merging process.",
    suggestions:
      "Consider using a more efficient sorting algorithm for large datasets.",
    sourceCode:
      "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left_half = merge_sort(arr[:mid])\n    right_half = merge_sort(arr[mid:])\n    return merge(left_half, right_half)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] < right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result",
    sourceLanguage: "Python",
    action: "code_optimization",
    timestamp: "2023-10-11 09:00:00",
  },
  {
    id: 13,
    optimization:
      "The function has been optimized to reduce the number of comparisons and improve performance by using a more efficient merging process.",
    suggestions:
      "Consider using a more efficient sorting algorithm for large datasets.",
    sourceCode:
      "def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left_half = merge_sort(arr[:mid])\n    right_half = merge_sort(arr[mid:])\n    return merge(left_half, right_half)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] < right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result",
    sourceLanguage: "Python",
    action: "code_optimization",
    timestamp: "2023-10-11 09:00:00",
  },
];





export const detailedHistoryData = [
  {
    id: 1,
    sourceCode: "def greet():\n    print('Hello, World!')",
    sourceLanguage: "JavaScript",
    targetLanguage: "Python",
    action: "translation",
    outputCode: "print('Hello, World!')",
    timestamp: "2023-10-01 10:00:00",
  }, 
  {
    id: 2,
    sourceCode: "console.log('Hello, World!');",
    sourceLanguage: "JavaScript",
    targetLanguage: "Python",
    action: "translation",
    outputCode: "print('Hello, World!')",
    timestamp: "2023-10-01 10:00:00",
  }, 
  {
    id: 3,
    sourceCode: "def greet():\n    print('Hello, World!')",
    sourceLanguage: "Python",
    targetLanguage: "JavaScript",
    action: "translation",
    outputCode: "console.log('Hello, World!')",
    timestamp: "2023-10-01 10:00:00",
  }, 

]