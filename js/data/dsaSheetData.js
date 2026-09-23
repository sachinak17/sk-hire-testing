/**
 * HireCraft - Dedicated Topic-Wise DSA Sheet Dataset
 * Curated problems with difficulty levels, company tags, intuition, complexity analysis,
 * and multi-language solutions (C++, Java, Python, JavaScript).
 */

export const DSA_TOPICS = [
  { id: 'arrays_hashing', name: 'Arrays & Hashing', icon: '📊', description: 'Fundamental array manipulations, prefix sums, hashing techniques' },
  { id: 'two_pointers_sliding', name: 'Two Pointers & Sliding Window', icon: '🪟', description: 'Subarray bounds, two-way scans, window expansion & contraction' },
  { id: 'strings', name: 'Strings & Parsing', icon: '🔤', description: 'String immutability, anagrams, palindromes, pattern matching' },
  { id: 'linked_lists', name: 'Linked Lists', icon: '🔗', description: 'Pointer manipulation, fast & slow pointers, reversing, merging' },
  { id: 'stacks_queues', name: 'Stacks & Queues', icon: '📚', description: 'LIFO & FIFO, monotonic stacks, parentheses matching' },
  { id: 'binary_search', name: 'Binary Search', icon: '🔍', description: 'Search spaces, sorted arrays, monotonic predicates (BS on answer)' },
  { id: 'trees', name: 'Trees & BST', icon: '🌳', description: 'Recursion on trees, DFS/BFS traversals, LCA, binary search tree properties' },
  { id: 'graphs', name: 'Graphs', icon: '🕸️', description: 'Adjacency lists, BFS/DFS, topological sort, Dijkstra shortest path, DSU' },
  { id: 'dp', name: 'Dynamic Programming', icon: '⚡', description: 'Overlapping subproblems, optimal substructure, 1D & 2D memoization / tabulation' },
  { id: 'greedy_bits', name: 'Greedy & Bit Manipulation', icon: '💡', description: 'Locally optimal choices, interval scheduling, bitwise operators' }
];

export const DSA_PROBLEMS = [
  // 1. Arrays & Hashing
  {
    id: 'dsa_1',
    topicId: 'arrays_hashing',
    title: 'Two Sum',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Microsoft', 'TCS Digital', 'Infosys'],
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    intuition: 'Use a Hash Map to store elements and their indices as we iterate. For each element x, check if (target - x) exists in the map. If yes, return their indices in O(1) lookup time.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    code: {
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`,
      javascript: `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
};`
    }
  },
  {
    id: 'dsa_2',
    topicId: 'arrays_hashing',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    companies: ['Amazon', 'Microsoft', 'Accenture'],
    leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',
    intuition: 'Store visited elements in a hash set. If an element is already present in the set during traversal, return true immediately.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    code: {
      cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> set(nums.begin(), nums.end());
        return set.size() < nums.size();
    }
};`,
      java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int n : nums) {
            if (!set.add(n)) return true;
        }
        return false;
    }
}`,
      python: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        return len(nums) != len(set(nums))`,
      javascript: `var containsDuplicate = function(nums) {
    return new Set(nums).size !== nums.length;
};`
    }
  },
  {
    id: 'dsa_3',
    topicId: 'arrays_hashing',
    title: 'Maximum Subarray (Kadane’s Algorithm)',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Microsoft', 'Goldman Sachs', 'TCS'],
    leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/',
    intuition: 'Kadane’s algorithm keeps track of current sum. If the running sum becomes negative, reset it to 0 because a negative prefix can never contribute to a maximum future subarray.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    code: {
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0];
        int currentSum = 0;
        for (int x : nums) {
            currentSum = max(x, currentSum + x);
            maxSum = max(maxSum, currentSum);
        }
        return maxSum;
    }
};`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        int max = nums[0], sum = 0;
        for (int x : nums) {
            sum += x;
            if (sum > max) max = sum;
            if (sum < 0) sum = 0;
        }
        return max;
    }
}`,
      python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        max_sum = nums[0]
        cur_sum = 0
        for x in nums:
            cur_sum = max(x, cur_sum + x)
            max_sum = max(max_sum, cur_sum)
        return max_sum`,
      javascript: `var maxSubArray = function(nums) {
    let max = nums[0], sum = 0;
    for (let x of nums) {
        sum = Math.max(x, sum + x);
        max = Math.max(max, sum);
    }
    return max;
};`
    }
  },
  {
    id: 'dsa_4',
    topicId: 'arrays_hashing',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    companies: ['Amazon', 'Apple', 'Google', 'Microsoft'],
    leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/',
    intuition: 'Calculate prefix products in a first pass from left to right, then multiply by running suffix products in a second pass from right to left in O(1) auxiliary space.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1) excluding output array',
    code: {
      cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= right;
            right *= nums[i];
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        res[0] = 1;
        for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= right;
            right *= nums[i];
        }
        return res;
    }
}`,
      python: `class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [1] * n
        for i in range(1, n):
            res[i] = res[i-1] * nums[i-1]
        right = 1
        for i in range(n-1, -1, -1):
            res[i] *= right
            right *= nums[i]
        return res`,
      javascript: `var productExceptSelf = function(nums) {
    const n = nums.length;
    const res = new Array(n).fill(1);
    for (let i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
    let right = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= right;
        right *= nums[i];
    }
    return res;
};`
    }
  },

  // 2. Two Pointers & Sliding Window
  {
    id: 'dsa_5',
    topicId: 'two_pointers_sliding',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    companies: ['Microsoft', 'Amazon', 'Facebook', 'TCS'],
    leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
    intuition: 'Place two pointers at the start and end of the string. Advance past non-alphanumeric characters and compare lowercase equivalents.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    code: {
      cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;
            while (l < r && !isalnum(s[r])) r--;
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++; r--;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;
            l++; r--;
        }
        return true;
    }
}`,
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        filtered = [c.lower() for c in s if c.isalnum()]
        return filtered == filtered[::-1]`,
      javascript: `var isPalindrome = function(s) {
    const clean = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    let l = 0, r = clean.length - 1;
    while (l < r) {
        if (clean[l] !== clean[r]) return false;
        l++; r--;
    }
    return true;
};`
    }
  },
  {
    id: 'dsa_6',
    topicId: 'two_pointers_sliding',
    title: '3Sum',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Microsoft', 'Atlassian'],
    leetcodeUrl: 'https://leetcode.com/problems/3sum/',
    intuition: 'Sort the array first. Loop through element i, then use two pointers (left and right) to find pairs that sum to -nums[i]. Skip duplicates to avoid duplicate triplets.',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(1) extra space',
    code: {
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        for (int i = 0; i < nums.size(); i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = nums.size() - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.push_back({nums[i], nums[l], nums[r]});
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
        return res;
    }
};`,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
        return res;
    }
}`,
      python: `class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i-1]: continue
            l, r = i + 1, len(nums) - 1
            while l < r:
                s = nums[i] + nums[l] + nums[r]
                if s == 0:
                    res.append([nums[i], nums[l], nums[r]])
                    while l < r and nums[l] == nums[l+1]: l += 1
                    while l < r and nums[r] == nums[r-1]: r -= 1
                    l += 1; r -= 1
                elif s < 0: l += 1
                else: r -= 1
        return res`,
      javascript: `var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const res = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let l = i + 1, r = nums.length - 1;
        while (l < r) {
            const sum = nums[i] + nums[l] + nums[r];
            if (sum === 0) {
                res.push([nums[i], nums[l], nums[r]]);
                while (l < r && nums[l] === nums[l + 1]) l++;
                while (l < r && nums[r] === nums[r - 1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return res;
};`
    }
  },
  {
    id: 'dsa_7',
    topicId: 'two_pointers_sliding',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Microsoft', 'Goldman Sachs'],
    leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    intuition: 'Maintain a sliding window [left, right] and a hash map of the most recent index of each character. When a duplicate is seen within the window, jump the left pointer.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(min(N, M)) where M is character set size',
    code: {
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> lastIndex(128, -1);
        int maxLen = 0, l = 0;
        for (int r = 0; r < s.size(); r++) {
            if (lastIndex[s[r]] >= l) {
                l = lastIndex[s[r]] + 1;
            }
            lastIndex[s[r]] = r;
            maxLen = max(maxLen, r - l + 1);
        }
        return maxLen;
    }
};`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int maxLen = 0, l = 0;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            if (map.containsKey(c)) {
                l = Math.max(l, map.get(c) + 1);
            }
            map.put(c, r);
            maxLen = Math.max(maxLen, r - l + 1);
        }
        return maxLen;
    }
}`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_map = {}
        max_len = l = 0
        for r, char in enumerate(s):
            if char in char_map and char_map[char] >= l:
                l = char_map[char] + 1
            char_map[char] = r
            max_len = max(max_len, r - l + 1)
        return max_len`,
      javascript: `var lengthOfLongestSubstring = function(s) {
    const map = new Map();
    let max = 0, l = 0;
    for (let r = 0; r < s.length; r++) {
        if (map.has(s[r]) && map.get(s[r]) >= l) {
            l = map.get(s[r]) + 1;
        }
        map.set(s[r], r);
        max = Math.max(max, r - l + 1);
    }
    return max;
};`
    }
  },

  // 3. Linked Lists
  {
    id: 'dsa_8',
    topicId: 'linked_lists',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Microsoft', 'TCS', 'Infosys'],
    leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    intuition: 'Maintain three pointers: prev (null), curr (head), and next. In each step, save curr.next, point curr.next to prev, then advance prev and curr forward.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    code: {
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
};`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`,
      python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev, curr = None, head
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        return prev`,
      javascript: `var reverseList = function(head) {
    let prev = null, curr = head;
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};`
    }
  },
  {
    id: 'dsa_9',
    topicId: 'linked_lists',
    title: 'Linked List Cycle (Floyd’s Tortoise & Hare)',
    difficulty: 'Easy',
    companies: ['Amazon', 'Microsoft', 'Accenture', 'Cognizant'],
    leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/',
    intuition: 'Use two pointers: slow moves 1 step, fast moves 2 steps. If a cycle exists, fast will eventually catch up with slow inside the loop.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    code: {
      cpp: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};`,
      java: `public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
      python: `class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast: return True
        return False`,
      javascript: `var hasCycle = function(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
};`
    }
  },

  // 4. Stacks & Queues
  {
    id: 'dsa_10',
    topicId: 'stacks_queues',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    companies: ['Google', 'Amazon', 'Microsoft', 'TCS', 'Infosys'],
    leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
    intuition: 'Push opening brackets onto a stack. When a closing bracket arrives, verify that the top of stack matches the corresponding pair and pop. Return true if stack is empty at the end.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    code: {
      cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                if (c == ')' && st.top() != '(') return false;
                if (c == '}' && st.top() != '{') return false;
                if (c == ']' && st.top() != '[') return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        mapping = {')': '(', '}': '{', ']': '['}
        stack = []
        for char in s:
            if char in mapping:
                top = stack.pop() if stack else '#'
                if mapping[char] != top:
                    return False
            else:
                stack.append(char)
        return not stack`,
      javascript: `var isValid = function(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (let c of s) {
        if (c === '(' || c === '{' || c === '[') stack.push(c);
        else if (stack.pop() !== map[c]) return false;
    }
    return stack.length === 0;
};`
    }
  },

  // 5. Binary Search
  {
    id: 'dsa_11',
    topicId: 'binary_search',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Microsoft', 'Atlassian'],
    leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    intuition: 'At any pivot, at least one half of the rotated array is strictly sorted. Check if target lies within the sorted half; if yes, discard the other half, else search the opposite half.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    code: {
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            if (nums[l] <= nums[mid]) {
                if (nums[l] <= target && target < nums[mid]) r = mid - 1;
                else l = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[r]) l = mid + 1;
                else r = mid - 1;
            }
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            if (nums[l] <= nums[mid]) {
                if (nums[l] <= target && target < nums[mid]) r = mid - 1;
                else l = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[r]) l = mid + 1;
                else r = mid - 1;
            }
        }
        return -1;
    }
}`,
      python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target: return mid
            if nums[l] <= nums[mid]:
                if nums[l] <= target < nums[mid]: r = mid - 1
                else: l = mid + 1
            else:
                if nums[mid] < target <= nums[r]: l = mid + 1
                else: r = mid - 1
        return -1`,
      javascript: `var search = function(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        if (nums[mid] === target) return mid;
        if (nums[l] <= nums[mid]) {
            if (nums[l] <= target && target < nums[mid]) r = mid - 1;
            else l = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[r]) l = mid + 1;
            else r = mid - 1;
        }
    }
    return -1;
};`
    }
  },

  // 6. Trees & BST
  {
    id: 'dsa_12',
    topicId: 'trees',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Microsoft', 'TCS'],
    leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    intuition: 'Recursive DFS: The depth of any node is 1 + max(depth(left), depth(right)). Base case returns 0 when node is null.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H) recursion stack height',
    code: {
      cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`,
      java: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
      python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root: return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
      javascript: `var maxDepth = function(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};`
    }
  },
  {
    id: 'dsa_13',
    topicId: 'trees',
    title: 'Lowest Common Ancestor of a Binary Tree',
    difficulty: 'Medium',
    companies: ['Amazon', 'Microsoft', 'Facebook', 'Google'],
    leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
    intuition: 'Search for p and q recursively in left and right subtrees. If a node finds p in one branch and q in the other, that node is their Lowest Common Ancestor.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H)',
    code: {
      cpp: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left && right) return root;
        return left ? left : right;
    }
};`,
      java: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`,
      python: `class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if not root or root == p or root == q:
            return root
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        if left and right: return root
        return left or right`,
      javascript: `var lowestCommonAncestor = function(root, p, q) {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root;
    return left || right;
};`
    }
  },

  // 7. Graphs
  {
    id: 'dsa_14',
    topicId: 'graphs',
    title: 'Number of Islands',
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Microsoft', 'Bloomberg'],
    leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
    intuition: 'Iterate through every grid cell. Whenever an unvisited land cell \'1\' is found, increment island count and trigger a BFS/DFS to sink the entire connected island by marking visited cells to \'0\'.',
    timeComplexity: 'O(M × N)',
    spaceComplexity: 'O(M × N)',
    code: {
      cpp: `class Solution {
public:
    void dfs(vector<vector<char>>& grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size() || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
    int numIslands(vector<vector<char>>& grid) {
        int count = 0;
        for (int i = 0; i < grid.size(); i++) {
            for (int j = 0; j < grid[0].size(); j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }
};`,
      java: `class Solution {
    public int numIslands(char[][] grid) {
        int count = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    sink(grid, i, j);
                }
            }
        }
        return count;
    }
    private void sink(char[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;
        grid[r][c] = '0';
        sink(grid, r + 1, c);
        sink(grid, r - 1, c);
        sink(grid, r, c + 1);
        sink(grid, r, c - 1);
    }
}`,
      python: `class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid: return 0
        rows, cols = len(grid), len(grid[0])
        count = 0
        def dfs(r, c):
            if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] != '1': return
            grid[r][c] = '0'
            dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
        return count`,
      javascript: `var numIslands = function(grid) {
    let count = 0;
    const dfs = (r, c) => {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] !== '1') return;
        grid[r][c] = '0';
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
    };
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    return count;
};`
    }
  },

  // 8. Dynamic Programming
  {
    id: 'dsa_15',
    topicId: 'dp',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'TCS', 'Infosys'],
    leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/',
    intuition: 'Each step can be reached either from (i - 1) or (i - 2). Thus dp[i] = dp[i-1] + dp[i-2], which is the Fibonacci recurrence. Compute using 2 rolling variables.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    code: {
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
};`,
      java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2: return n
        a, b = 1, 2
        for _ in range(3, n + 1):
            a, b = b, a + b
        return b`,
      javascript: `var climbStairs = function(n) {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
        const c = a + b;
        a = b;
        b = c;
    }
    return b;
};`
    }
  },
  {
    id: 'dsa_16',
    topicId: 'dp',
    title: 'Coin Change',
    difficulty: 'Medium',
    companies: ['Amazon', 'Microsoft', 'Goldman Sachs', 'Atlassian'],
    leetcodeUrl: 'https://leetcode.com/problems/coin-change/',
    intuition: 'Define dp[i] as the fewest coins needed to make amount i. For each amount from 1 to total, try taking every available coin c where c <= i: dp[i] = min(dp[i], dp[i - c] + 1).',
    timeComplexity: 'O(amount × number of coins)',
    spaceComplexity: 'O(amount)',
    code: {
      cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i >= c) dp[i] = min(dp[i], dp[i - c] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
      java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int max = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, max);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i >= c) dp[i] = Math.min(dp[i], dp[i - c] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
      python: `class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for i in range(1, amount + 1):
            for c in coins:
                if i >= c:
                    dp[i] = min(dp[i], dp[i - c] + 1)
        return dp[amount] if dp[amount] != float('inf') else -1`,
      javascript: `var coinChange = function(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (let c of coins) {
            if (i >= c) dp[i] = Math.min(dp[i], dp[i - c] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
};`
    }
  },

  // 9. Greedy & Bit Manipulation
  {
    id: 'dsa_17',
    topicId: 'greedy_bits',
    title: 'Single Number',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Accenture', 'TCS'],
    leetcodeUrl: 'https://leetcode.com/problems/single-number/',
    intuition: 'XOR property: x ^ x = 0, and x ^ 0 = x. XORing all elements together cancels out every duplicate pair, leaving only the unique single number.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    code: {
      cpp: `class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for (int x : nums) res ^= x;
        return res;
    }
};`,
      java: `class Solution {
    public int singleNumber(int[] nums) {
        int res = 0;
        for (int x : nums) res ^= x;
        return res;
    }
}`,
      python: `class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        res = 0
        for x in nums: res ^= x
        return res`,
      javascript: `var singleNumber = function(nums) {
    return nums.reduce((acc, curr) => acc ^ curr, 0);
};`
    }
  },
  {
    id: 'dsa_18',
    topicId: 'greedy_bits',
    title: 'Non-overlapping Intervals',
    difficulty: 'Medium',
    companies: ['Amazon', 'Microsoft', 'Google', 'Goldman Sachs'],
    leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/',
    intuition: 'Sort intervals by their end time. Greedily pick the interval that finishes earliest to leave maximum room for subsequent non-overlapping intervals.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(1)',
    code: {
      cpp: `class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b) {
            return a[1] < b[1];
        });
        int count = 0, prevEnd = intervals[0][1];
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] < prevEnd) count++;
            else prevEnd = intervals[i][1];
        }
        return count;
    }
};`,
      java: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int count = 0, prevEnd = intervals[0][1];
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < prevEnd) count++;
            else prevEnd = intervals[i][1];
        }
        return count;
    }
}`,
      python: `class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: x[1])
        count = 0
        prev_end = intervals[0][1]
        for i in range(1, len(intervals)):
            if intervals[i][0] < prev_end:
                count += 1
            else:
                prev_end = intervals[i][1]
        return count`,
      javascript: `var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a, b) => a[1] - b[1]);
    let count = 0, prevEnd = intervals[0][1];
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < prevEnd) count++;
        else prevEnd = intervals[i][1];
    }
    return count;
};`
    }
  },

  // 19. Strings & Parsing - Easy
  {
    id: 'dsa_19',
    topicId: 'strings',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'TCS Digital', 'Infosys', 'Accenture'],
    leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',
    intuition: 'Count frequency of each character in string s and decrement for string t. If all counts are zero, they are anagrams.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1) (26 characters)',
    code: {
      cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;
        int count[26] = {0};
        for (char c : s) count[c - 'a']++;
        for (char c : t) {
            if (--count[c - 'a'] < 0) return false;
        }
        return true;
    }
};`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (char c : s.toCharArray()) count[c - 'a']++;
        for (char c : t.toCharArray()) {
            if (--count[c - 'a'] < 0) return false;
        }
        return true;
    }
}`,
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        count = {}
        for c in s:
            count[c] = count.get(c, 0) + 1
        for c in t:
            if c not in count or count[c] == 0:
                return False
            count[c] -= 1
        return True`,
      javascript: `var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;
    const counts = {};
    for (const c of s) counts[c] = (counts[c] || 0) + 1;
    for (const c of t) {
        if (!counts[c]) return false;
        counts[c]--;
    }
    return true;
};`
    }
  },

  // 20. Binary Search - Easy
  {
    id: 'dsa_20',
    topicId: 'binary_search',
    title: 'Binary Search',
    difficulty: 'Easy',
    companies: ['Google', 'Microsoft', 'Wipro', 'Cognizant'],
    leetcodeUrl: 'https://leetcode.com/problems/binary-search/',
    intuition: 'Maintain left and right search boundaries. Repeatedly compare target with mid element and halve the search space.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    code: {
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
      python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1`,
      javascript: `var search = function(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
};`
    }
  },

  // 21. Trees - Easy
  {
    id: 'dsa_21',
    topicId: 'trees',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    companies: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/',
    intuition: 'Recursively swap the left and right children for every node in the binary tree.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(H) recursion stack',
    code: {
      cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        TreeNode* temp = root->left;
        root->left = invertTree(root->right);
        root->right = invertTree(temp);
        return root;
    }
};`,
      java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(temp);
        return root;
    }
}`,
      python: `class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root`,
      javascript: `var invertTree = function(root) {
    if (!root) return null;
    const temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);
    return root;
};`
    }
  },

  // 22. Linked Lists - Easy
  {
    id: 'dsa_22',
    topicId: 'linked_lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    companies: ['Amazon', 'Apple', 'Microsoft', 'Oracle'],
    leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    intuition: 'Create a dummy head. Compare the head values of both sorted lists, append the smaller node to the merged list, and advance the respective pointer.',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(1)',
    code: {
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;
        while (list1 && list2) {
            if (list1->val <= list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        tail->next = list1 ? list1 : list2;
        return dummy.next;
    }
};`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`,
      python: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        tail = dummy
        while list1 and list2:
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next
        tail.next = list1 or list2
        return dummy.next`,
      javascript: `var mergeTwoLists = function(list1, list2) {
    const dummy = new ListNode(0);
    let tail = dummy;
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            tail.next = list1;
            list1 = list1.next;
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next;
    }
    tail.next = list1 || list2;
    return dummy.next;
};`
    }
  },

  // 23. Strings & Parsing - Medium
  {
    id: 'dsa_23',
    topicId: 'strings',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    companies: ['Amazon', 'Microsoft', 'Adobe', 'Goldman Sachs'],
    leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/',
    intuition: 'Expand around each center. Since a palindrome mirrors around its center, expand outward for both odd-length (center at i) and even-length (center at i and i+1) candidates.',
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(1)',
    code: {
      cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        if (s.empty()) return "";
        int start = 0, maxLen = 1;
        auto expand = [&](int l, int r) {
            while (l >= 0 && r < s.length() && s[l] == s[r]) {
                if (r - l + 1 > maxLen) {
                    start = l;
                    maxLen = r - l + 1;
                }
                l--; r++;
            }
        };
        for (int i = 0; i < s.length(); i++) {
            expand(i, i);
            expand(i, i + 1);
        }
        return s.substr(start, maxLen);
    }
};`,
      java: `class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start + 1) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }
    private int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}`,
      python: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        res = ""
        for i in range(len(s)):
            # Odd length
            l, r = i, i
            while l >= 0 and r < len(s) and s[l] == s[r]:
                if (r - l + 1) > len(res):
                    res = s[l:r+1]
                l -= 1
                r += 1
            # Even length
            l, r = i, i + 1
            while l >= 0 and r < len(s) and s[l] == s[r]:
                if (r - l + 1) > len(res):
                    res = s[l:r+1]
                l -= 1
                r += 1
        return res`,
      javascript: `var longestPalindrome = function(s) {
    if (!s || s.length <= 1) return s;
    let start = 0, maxLen = 1;
    function expand(l, r) {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            if (r - l + 1 > maxLen) {
                start = l;
                maxLen = r - l + 1;
            }
            l--;
            r++;
        }
    }
    for (let i = 0; i < s.length; i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    return s.substring(start, start + maxLen);
};`
    }
  },

  // 24. Stacks & Queues - Medium
  {
    id: 'dsa_24',
    topicId: 'stacks_queues',
    title: 'Min Stack',
    difficulty: 'Medium',
    companies: ['Bloomberg', 'Amazon', 'Uber', 'Walmart'],
    leetcodeUrl: 'https://leetcode.com/problems/min-stack/',
    intuition: 'Maintain a secondary minStack or store pairs (val, currentMin). Every push updates the current running minimum so getMin() executes in O(1).',
    timeComplexity: 'O(1) for all operations',
    spaceComplexity: 'O(N)',
    code: {
      cpp: `class MinStack {
    stack<int> s;
    stack<int> minS;
public:
    MinStack() {}
    void push(int val) {
        s.push(val);
        if (minS.empty() || val <= minS.top()) minS.push(val);
        else minS.push(minS.top());
    }
    void pop() {
        s.pop();
        minS.pop();
    }
    int top() { return s.top(); }
    int getMin() { return minS.top(); }
};`,
      java: `class MinStack {
    private Stack<Integer> stack = new Stack<>();
    private Stack<Integer> minStack = new Stack<>();
    public MinStack() {}
    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) minStack.push(val);
        else minStack.push(minStack.peek());
    }
    public void pop() {
        stack.pop();
        minStack.pop();
    }
    public int top() { return stack.peek(); }
    public int getMin() { return minStack.peek(); }
}`,
      python: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        val = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(val)

    def pop(self) -> None:
        self.stack.pop()
        self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`,
      javascript: `var MinStack = function() {
    this.stack = [];
    this.minStack = [];
};
MinStack.prototype.push = function(val) {
    this.stack.push(val);
    const minVal = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(minVal);
};
MinStack.prototype.pop = function() {
    this.stack.pop();
    this.minStack.pop();
};
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};
MinStack.prototype.getMin = function() {
    return this.minStack[this.minStack.length - 1];
};`
    }
  },

  // 25. Graphs - Medium
  {
    id: 'dsa_25',
    topicId: 'graphs',
    title: 'Course Schedule (Cycle Detection / Topological Sort)',
    difficulty: 'Medium',
    companies: ['Amazon', 'Meta', 'Google', 'Salesforce'],
    leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',
    intuition: 'Model prerequisites as a directed graph. Use Kahn’s algorithm (BFS with in-degrees) or DFS cycle detection. If the count of nodes processed equals numCourses, all courses can be finished without a cycle.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    code: {
      cpp: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);
        for (auto& edge : prerequisites) {
            adj[edge[1]].push_back(edge[0]);
            inDegree[edge[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.push(i);
        }
        int count = 0;
        while (!q.empty()) {
            int node = q.front(); q.pop();
            count++;
            for (int neighbor : adj[node]) {
                if (--inDegree[neighbor] == 0) q.push(neighbor);
            }
        }
        return count == numCourses;
    }
};`,
      java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[numCourses];
        for (int[] edge : prerequisites) {
            adj.get(edge[1]).add(edge[0]);
            inDegree[edge[0]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.add(i);
        }
        int count = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            count++;
            for (int nxt : adj.get(node)) {
                if (--inDegree[nxt] == 0) q.add(nxt);
            }
        }
        return count == numCourses;
    }
}`,
      python: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        adj = collections.defaultdict(list)
        in_degree = [0] * numCourses
        for dest, src in prerequisites:
            adj[src].append(dest)
            in_degree[dest] += 1
        queue = collections.deque([i for i in range(numCourses) if in_degree[i] == 0])
        count = 0
        while queue:
            node = queue.popleft()
            count += 1
            for nxt in adj[node]:
                in_degree[nxt] -= 1
                if in_degree[nxt] == 0:
                    queue.append(nxt)
        return count == numCourses`,
      javascript: `var canFinish = function(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    const inDegree = new Array(numCourses).fill(0);
    for (const [dest, src] of prerequisites) {
        adj[src].push(dest);
        inDegree[dest]++;
    }
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }
    let count = 0;
    while (queue.length > 0) {
        const node = queue.shift();
        count++;
        for (const nxt of adj[node]) {
            inDegree[nxt]--;
            if (inDegree[nxt] === 0) queue.push(nxt);
        }
    }
    return count === numCourses;
};`
    }
  },

  // 26. Trees - Medium
  {
    id: 'dsa_26',
    topicId: 'trees',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    companies: ['Amazon', 'Microsoft', 'Meta', 'LinkedIn'],
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    intuition: 'Use Breadth-First Search (BFS) with a queue. For each level, capture its current size, process all nodes at that level into a list, and push their children into the queue.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    code: {
      cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (!root) return result;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int levelSize = q.size();
            vector<int> level;
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front(); q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            result.push_back(level);
        }
        return result;
    }
};`,
      java: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode cur = q.poll();
                level.add(cur.val);
                if (cur.left != null) q.add(cur.left);
                if (cur.right != null) q.add(cur.right);
            }
            res.add(level);
        }
        return res;
    }
}`,
      python: `class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        res = []
        q = collections.deque([root])
        while q:
            level = []
            for _ in range(len(q)):
                node = q.popleft()
                level.append(node.val)
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            res.append(level)
        return res`,
      javascript: `var levelOrder = function(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(currentLevel);
    }
    return result;
};`
    }
  },

  // 27. Dynamic Programming - Medium
  {
    id: 'dsa_27',
    topicId: 'dp',
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    companies: ['Google', 'Microsoft', 'Amazon', 'Cisco'],
    leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/',
    intuition: 'Maintain a tails array representing the smallest tail of all increasing subsequences of length i+1. For each number, binary search for its insertion point (Patience Sorting).',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    code: {
      cpp: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;
        for (int x : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) tails.push_back(x);
            else *it = x;
        }
        return tails.size();
    }
};`,
      java: `class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int size = 0;
        for (int x : nums) {
            int i = 0, j = size;
            while (i < j) {
                int m = (i + j) / 2;
                if (tails[m] < x) i = m + 1;
                else j = m;
            }
            tails[i] = x;
            if (i == size) size++;
        }
        return size;
    }
}`,
      python: `class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        tails = []
        for x in nums:
            idx = bisect.bisect_left(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x
        return len(tails)`,
      javascript: `var lengthOfLIS = function(nums) {
    const tails = [];
    for (const x of nums) {
        let l = 0, r = tails.length;
        while (l < r) {
            const mid = Math.floor((l + r) / 2);
            if (tails[mid] < x) l = mid + 1;
            else r = mid;
        }
        if (l === tails.length) tails.push(x);
        else tails[l] = x;
    }
    return tails.length;
};`
    }
  },

  // 28. Two Pointers & Sliding Window - Hard
  {
    id: 'dsa_28',
    topicId: 'two_pointers_sliding',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    companies: ['Google', 'Amazon', 'Meta', 'Goldman Sachs', 'Apple'],
    leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/',
    intuition: 'Use two pointers from left and right. Maintain maxLeft and maxRight heights. Water trapped at the current pointer is governed by min(maxLeft, maxRight) - currentHeight.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    code: {
      cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int maxL = 0, maxR = 0, water = 0;
        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= maxL) maxL = height[left];
                else water += maxL - height[left];
                left++;
            } else {
                if (height[right] >= maxR) maxR = height[right];
                else water += maxR - height[right];
                right--;
            }
        }
        return water;
    }
};`,
      java: `class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int maxL = 0, maxR = 0, water = 0;
        while (left < right) {
            if (height[left] <= height[right]) {
                if (height[left] >= maxL) maxL = height[left];
                else water += maxL - height[left];
                left++;
            } else {
                if (height[right] >= maxR) maxR = height[right];
                else water += maxR - height[right];
                right--;
            }
        }
        return water;
    }
}`,
      python: `class Solution:
    def trap(self, height: List[int]) -> int:
        if not height: return 0
        l, r = 0, len(height) - 1
        max_l, max_r = height[l], height[r]
        water = 0
        while l < r:
            if max_l < max_r:
                l += 1
                max_l = max(max_l, height[l])
                water += max_l - height[l]
            else:
                r -= 1
                max_r = max(max_r, height[r])
                water += max_r - height[r]
        return water`,
      javascript: `var trap = function(height) {
    let left = 0, right = height.length - 1;
    let maxL = 0, maxR = 0, water = 0;
    while (left < right) {
        if (height[left] <= height[right]) {
            if (height[left] >= maxL) maxL = height[left];
            else water += maxL - height[left];
            left++;
        } else {
            if (height[right] >= maxR) maxR = height[right];
            else water += maxR - height[right];
            right--;
        }
    }
    return water;
};`
    }
  },

  // 29. Stacks & Queues - Hard
  {
    id: 'dsa_29',
    topicId: 'stacks_queues',
    title: 'Largest Rectangle in Histogram',
    difficulty: 'Hard',
    companies: ['Google', 'Amazon', 'Microsoft', 'Uber'],
    leetcodeUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
    intuition: 'Use a monotonic increasing stack of bar indices. When a bar of smaller height is encountered, pop elements and compute the area with the popped bar as the shortest bar.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    code: {
      cpp: `class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st;
        int maxArea = 0, n = heights.size();
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!st.empty() && heights[st.top()] > h) {
                int height = heights[st.top()]; st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, height * width);
            }
            st.push(i);
        }
        return maxArea;
    }
};`,
      java: `class Solution {
    public int largestRectangleArea(int[] heights) {
        Stack<Integer> st = new Stack<>();
        int maxArea = 0, n = heights.length;
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!st.isEmpty() && heights[st.peek()] > h) {
                int height = heights[st.pop()];
                int width = st.isEmpty() ? i : i - st.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            st.push(i);
        }
        return maxArea;
    }
}`,
      python: `class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        stack = []
        max_area = 0
        heights.append(0)
        for i, h in enumerate(heights):
            while stack and heights[stack[-1]] > h:
                height = heights[stack.pop()]
                width = i if not stack else i - stack[-1] - 1
                max_area = max(max_area, height * width)
            stack.append(i)
        heights.pop()
        return max_area`,
      javascript: `var largestRectangleArea = function(heights) {
    const stack = [];
    let maxArea = 0;
    const n = heights.length;
    for (let i = 0; i <= n; i++) {
        const h = i === n ? 0 : heights[i];
        while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
};`
    }
  },

  // 30. Linked Lists - Hard
  {
    id: 'dsa_30',
    topicId: 'linked_lists',
    title: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    companies: ['Meta', 'Amazon', 'Google', 'Microsoft', 'ByteDance'],
    leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    intuition: 'Pairwise divide and conquer merge (like merge sort) or use a min-heap of size k to extract the minimum head node and advance it.',
    timeComplexity: 'O(N log k) where N is total nodes',
    spaceComplexity: 'O(1) iterative divide & conquer',
    code: {
      cpp: `class Solution {
    ListNode* mergeTwo(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;
        while (l1 && l2) {
            if (l1->val <= l2->val) { tail->next = l1; l1 = l1->next; }
            else { tail->next = l2; l2 = l2->next; }
            tail = tail->next;
        }
        tail->next = l1 ? l1 : l2;
        return dummy.next;
    }
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        if (lists.empty()) return nullptr;
        int interval = 1;
        while (interval < lists.size()) {
            for (int i = 0; i + interval < lists.size(); i += interval * 2) {
                lists[i] = mergeTwo(lists[i], lists[i + interval]);
            }
            interval *= 2;
        }
        return lists[0];
    }
};`,
      java: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        return divideAndConquer(lists, 0, lists.length - 1);
    }
    private ListNode divideAndConquer(ListNode[] lists, int left, int right) {
        if (left == right) return lists[left];
        int mid = left + (right - left) / 2;
        ListNode l1 = divideAndConquer(lists, left, mid);
        ListNode l2 = divideAndConquer(lists, mid + 1, right);
        return mergeTwo(l1, l2);
    }
    private ListNode mergeTwo(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }
            else { tail.next = l2; l2 = l2.next; }
            tail = tail.next;
        }
        tail.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }
}`,
      python: `class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        if not lists:
            return None
        while len(lists) > 1:
            merged = []
            for i in range(0, len(lists), 2):
                l1 = lists[i]
                l2 = lists[i + 1] if (i + 1) < len(lists) else None
                merged.append(self.mergeTwo(l1, l2))
            lists = merged
        return lists[0]

    def mergeTwo(self, l1, l2):
        dummy = ListNode(0)
        tail = dummy
        while l1 and l2:
            if l1.val <= l2.val:
                tail.next, l1 = l1, l1.next
            else:
                tail.next, l2 = l2, l2.next
            tail = tail.next
        tail.next = l1 or l2
        return dummy.next`,
      javascript: `var mergeKLists = function(lists) {
    if (!lists || lists.length === 0) return null;
    function mergeTwo(l1, l2) {
        const dummy = new ListNode(0);
        let tail = dummy;
        while (l1 && l2) {
            if (l1.val <= l2.val) {
                tail.next = l1;
                l1 = l1.next;
            } else {
                tail.next = l2;
                l2 = l2.next;
            }
            tail = tail.next;
        }
        tail.next = l1 || l2;
        return dummy.next;
    }
    let interval = 1;
    while (interval < lists.length) {
        for (let i = 0; i + interval < lists.length; i += interval * 2) {
            lists[i] = mergeTwo(lists[i], lists[i + interval]);
        }
        interval *= 2;
    }
    return lists[0];
};`
    }
  },

  // 31. Binary Search - Hard
  {
    id: 'dsa_31',
    topicId: 'binary_search',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    companies: ['Google', 'Amazon', 'Apple', 'Adobe'],
    leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
    intuition: 'Perform binary search on the partition of the smaller array. Partition both arrays such that the left half has equal or +1 elements as the right half and max(left) <= min(right).',
    timeComplexity: 'O(log(min(M, N)))',
    spaceComplexity: 'O(1)',
    code: {
      cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.size(), n = nums2.size();
        int low = 0, high = m;
        while (low <= high) {
            int partX = (low + high) / 2;
            int partY = (m + n + 1) / 2 - partX;
            int maxLeftX = (partX == 0) ? INT_MIN : nums1[partX - 1];
            int minRightX = (partX == m) ? INT_MAX : nums1[partX];
            int maxLeftY = (partY == 0) ? INT_MIN : nums2[partY - 1];
            int minRightY = (partY == n) ? INT_MAX : nums2[partY];
            if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
                if ((m + n) % 2 == 0) {
                    return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2.0;
                } else {
                    return max(maxLeftX, maxLeftY);
                }
            } else if (maxLeftX > minRightY) {
                high = partX - 1;
            } else {
                low = partX + 1;
            }
        }
        return 0.0;
    }
};`,
      java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.length, n = nums2.length;
        int low = 0, high = m;
        while (low <= high) {
            int partX = (low + high) / 2;
            int partY = (m + n + 1) / 2 - partX;
            int maxLeftX = (partX == 0) ? Integer.MIN_VALUE : nums1[partX - 1];
            int minRightX = (partX == m) ? Integer.MAX_VALUE : nums1[partX];
            int maxLeftY = (partY == 0) ? Integer.MIN_VALUE : nums2[partY - 1];
            int minRightY = (partY == n) ? Integer.MAX_VALUE : nums2[partY];
            if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
                if ((m + n) % 2 == 0) {
                    return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2.0;
                } else {
                    return Math.max(maxLeftX, maxLeftY);
                }
            } else if (maxLeftX > minRightY) {
                high = partX - 1;
            } else {
                low = partX + 1;
            }
        }
        return 0.0;
    }
}`,
      python: `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        A, B = nums1, nums2
        if len(A) > len(B):
            A, B = B, A
        total = len(A) + len(B)
        half = total // 2
        l, r = 0, len(A) - 1
        while True:
            i = (l + r) // 2
            j = half - i - 2
            Aleft = A[i] if i >= 0 else float("-infinity")
            Aright = A[i + 1] if (i + 1) < len(A) else float("infinity")
            Bleft = B[j] if j >= 0 else float("-infinity")
            Bright = B[j + 1] if (j + 1) < len(B) else float("infinity")
            if Aleft <= Bright and Bleft <= Aright:
                if total % 2:
                    return min(Aright, Bright)
                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2
            elif Aleft > Bright:
                r = i - 1
            else:
                l = i + 1`,
      javascript: `var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
    const m = nums1.length, n = nums2.length;
    let low = 0, high = m;
    while (low <= high) {
        const partX = Math.floor((low + high) / 2);
        const partY = Math.floor((m + n + 1) / 2) - partX;
        const maxLeftX = partX === 0 ? -Infinity : nums1[partX - 1];
        const minRightX = partX === m ? Infinity : nums1[partX];
        const maxLeftY = partY === 0 ? -Infinity : nums2[partY - 1];
        const minRightY = partY === n ? Infinity : nums2[partY];
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            high = partX - 1;
        } else {
            low = partX + 1;
        }
    }
    return 0;
};`
    }
  },

  // 32. Graphs - Hard
  {
    id: 'dsa_32',
    topicId: 'graphs',
    title: 'Word Ladder',
    difficulty: 'Hard',
    companies: ['Amazon', 'Meta', 'LinkedIn', 'Google'],
    leetcodeUrl: 'https://leetcode.com/problems/word-ladder/',
    intuition: 'Breadth-First Search (BFS) to find the shortest transformation sequence. Replace each character from "a" to "z" to generate all 1-edit distance valid words in wordList.',
    timeComplexity: 'O(M^2 * N) where M is word length, N is list size',
    spaceComplexity: 'O(M * N)',
    code: {
      cpp: `class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return 0;
        queue<pair<string, int>> q;
        q.push({beginWord, 1});
        while (!q.empty()) {
            auto [word, len] = q.front(); q.pop();
            if (word == endWord) return len;
            for (int i = 0; i < word.length(); i++) {
                char orig = word[i];
                for (char c = 'a'; c <= 'z'; c++) {
                    word[i] = c;
                    if (dict.count(word)) {
                        dict.erase(word);
                        q.push({word, len + 1});
                    }
                }
                word[i] = orig;
            }
        }
        return 0;
    }
};`,
      java: `class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> set = new HashSet<>(wordList);
        if (!set.contains(endWord)) return 0;
        Queue<String> queue = new LinkedList<>();
        queue.add(beginWord);
        int level = 1;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String word = queue.poll();
                if (word.equals(endWord)) return level;
                char[] chars = word.toCharArray();
                for (int j = 0; j < chars.length; j++) {
                    char orig = chars[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        chars[j] = c;
                        String nextWord = new String(chars);
                        if (set.contains(nextWord)) {
                            set.remove(nextWord);
                            queue.add(nextWord);
                        }
                    }
                    chars[j] = orig;
                }
            }
            level++;
        }
        return 0;
    }
}`,
      python: `class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        word_set = set(wordList)
        if endWord not in word_set:
            return 0
        queue = collections.deque([(beginWord, 1)])
        while queue:
            word, length = queue.popleft()
            if word == endWord:
                return length
            for i in range(len(word)):
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    next_word = word[:i] + c + word[i+1:]
                    if next_word in word_set:
                        word_set.remove(next_word)
                        queue.append((next_word, length + 1))
        return 0`,
      javascript: `var ladderLength = function(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    const queue = [[beginWord, 1]];
    while (queue.length > 0) {
        const [word, step] = queue.shift();
        if (word === endWord) return step;
        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) {
                const char = String.fromCharCode(c);
                if (char === word[i]) continue;
                const nextWord = word.slice(0, i) + char + word.slice(i + 1);
                if (wordSet.has(nextWord)) {
                    wordSet.delete(nextWord);
                    queue.push([nextWord, step + 1]);
                }
            }
        }
    }
    return 0;
};`
    }
  },

  // 33. Dynamic Programming - Hard
  {
    id: 'dsa_33',
    topicId: 'dp',
    title: 'Edit Distance (Levenshtein Distance)',
    difficulty: 'Hard',
    companies: ['Google', 'Microsoft', 'Amazon', 'Apple'],
    leetcodeUrl: 'https://leetcode.com/problems/edit-distance/',
    intuition: '2D DP table where dp[i][j] represents the minimum operations to convert word1[0..i-1] into word2[0..j-1]. Transitions: match (cost 0), insert (dp[i][j-1]+1), delete (dp[i-1][j]+1), replace (dp[i-1][j-1]+1).',
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N) or O(N) space optimized',
    code: {
      cpp: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});
            }
        }
        return dp[m][n];
    }
};`,
      java: `class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
            }
        }
        return dp[m][n];
    }
}`,
      python: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        return dp[m][n]`,
      javascript: `var minDistance = function(word1, word2) {
    const m = word1.length, n = word2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
};`
    }
  }
];

