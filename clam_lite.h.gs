def init_token_tree {
    global_tokens[];
    global_types[];

    local_tokens[];
    local_types[];
    local_positions[];

    path[];
    position[];

    global_tokens.add "";
    global_types.add "1";
    position = 1;
    path.add "1";
    last = 0;
}

def follow {
    if tampered = 1 {
        build_parent_data;
    }
    position = last;
    path.add position;
    build_local;
}

def enter index {
    if tampered = 1 {
        build_parent_data;
    }
    postion = local_tokens[$index];
    path.add position;
    build_local;
}

def build_local {
    local_tokens[];
    local_types[];
    local_positions[];

    local parent_string = global_tokens[position];
    local joined = "";

    local char = 0;
    repeat length(parent_string) {
        char += 1;
        if letter(char, parent_string) = " " {
            local_tokens.add global_tokens[joined];
            local_types.add global_types[joined];
            local_positions.add joined;
            joined = "";
        } else {
            joined &= letter(char, parent_string);
        }
    }
}

def exit {
    if tampered = 1 {
        build_parent_data;
    }
    path.delete path.length;
    position = path[path.length];
    build_local;
}

def build_parent_data {
    local parent_data = "";

    local item = 0;
    repeat local_tokens.length {
        item += 1;
        parent_data &= local_positions[item] & " ";
    }

    global_tokens[position] = parent_data;
    tampered = 0;
}

def create_node {
    global_tokens.add "";
    global_types.add "1";
    global_tokens[position] = global_tokens[position] & global_tokens.length & " ";

    local_tokens.add "";
    local_types.add "1";
    local_positions.add global_tokens.length;
    tampered = 1;

    last = global_tokens.length;
}

def create_string content {
    global_tokens.add $content;
    global_types.add "0";
    global_tokens[position] = global_tokens[position] & global_tokens.length & " ";

    local_tokens.add $content;
    local_types.add "0";
    local_positions.add global_tokens.length;

    tampered = 1;
}