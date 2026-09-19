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
  }
];
