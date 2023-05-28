# clam-lite
A lightweight implementation of my node-like data structure for Scratch.

## Differences
Read [§ Data Structure](#data-structure) if you haven't used Clam 1.X.  

### Tokens
In Clam 1.X, every data point carries three values: `data`, `key` and `type`. clam-lite only implements `data` and `type` as `token` and `type`.

### Reduced Tampering

The tampering flag (tampered) in clam-lite indicates if the token tree has been modified. By tracking changes only when needed, it speeds up execution and simplifies development.

## Data Structure

The tree structure is a hierarchical representation of tokens, organized in a tree-like fashion. It allows you to store and manipulate structured data in your project. Each token in the tree consists of a value and a corresponding type.

Here is a sample table illustrating the structure of a tree:

| idx | token | type |
|:---:|:----- |:----:|
|  1  | 2 3   |   1  |
|  2  | Hello |   0  |
|  3  | World |   0  |
|  4  | 5 6 7 |   1  |
|  5  | How   |   0  |
|  6  | Are   |   0  |
|  7  | You?  |   0  |

In the above example, we have a tree with seven tokens. Tokens with a type of "1" represent nodes in the tree, while tokens with a type of "0" represent string values. The items 2 and 3 are the children of item 1. Likewise, 5, 6 and 7 are the children of 4.

## Functions

### Initialising

`init_token_tree`:  
Initializes the token tree and sets up the required data structures.

### Traversing

`enter index`:  
Enters the token at the specified index and updates the current position accordingly. It then builds the local data structures based on the new position.

`follow`:  
Moves the current position to the last added node in the tree and builds the local data structures accordingly.

`exit`:  
Moves the current position to the parent position in the token tree and rebuilds the local data structures accordingly.

### Modifying data

`create_node`:  
Creates a new node in the token tree. It appends an empty token to the global tokens, updates the parent node's data with the new token index, and adds the new token to the local data structures. It sets the tampered flag.

`create_string content`:  
Creates a new string token in the token tree. It appends the specified content to the global tokens, updates the parent node's data with the new token index, and adds the new token to the local data structures.

### Internal

`build_parent_data`:  
Builds the parent data string by concatenating the local positions of tokens. It updates the parent node's data and resets the tampered flag.

`build_local`:  
Builds the local data structures based on the current position in the token tree. It extracts tokens, types, and positions from the global tokens and stores them in the local data structures.
