class KeyValuePair {//hjerherh
    constructor(initKey, initValue) {
        this.key = initKey;
        this.value = initValue;
    }
    
    toString() {
        return "(" + this.key + ", " + this.value.toString() + ")";
    }
}

export default class OpenAddressHashTable {
    constructor(initLength, initKeyLength) {
        this.length = initLength;
        this.size = 0;
        this.keyLength = initKeyLength;
        this.hashTable = [];
    }

    hashCode(key) {
        let charsSum = 0;
        for (let i = 0; i < key.length; i++) {
            let keyChar = key.charAt(i);
            let charAsNum = keyChar.charCodeAt(0);
            charsSum += charAsNum;
        }
        return charsSum % this.length;
    }

    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 36);
            let randomChar;
            if (randomNum < 10) {
                randomNum += 48;
                randomChar = String.fromCharCode(randomNum);
            }
            else {
                randomNum += 55;
                randomChar = String.fromCharCode(randomNum);
            }
            key += randomChar;
        }
        return key;
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    getValue(key) {
        let temKey = key;
        let index = this.hashCode(key);
        if(this.hashTable[index] != null)
        {
            if(this.hashTable[index].key === temKey)
            {
                return this.hashTable[index];
            }
        }   
        //wrap if it isn't there
        for(let i = index; i < this.hashTable.length; i++)
        {
            if(this.hashTable[i] != null)
            {
                if(this.hashTable[i].key === temKey )
                {
                    return this.hashTable[i];
                }
            }
        }
        for(let i = 0; i < index; i++)
        {
            if(this.hashTable[i] != null)
            {
                if(this.hashTable[i].key === temKey)
                {
                    return this.hashTable[i];
                }
            }
        }
        return null;
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {   
    }

    // @todo - YOU MUST DEFINE THIS METHOD
    putValue(key, item) {
        let newKeyValuePair = new KeyValuePair(key, item);
        let index = this.hashCode(key);
        if(this.getValue(newKeyValuePair.key) != null)
        {
            for(let i = 0; i<this.hashTable.length; i++)
            {
                if(this.hashTable[i] != null)
                {
                    if(this.hashTable[i].key === key)
                    {
                        this.hashTable[i] = newKeyValuePair;
                    }
                }
            }
        }
        //if value doesn't exist you start from hashindex until future
        // from index to length
        if(this.hashTable[index] == null)
        {
            this.hashTable[index] = newKeyValuePair;
            this.size = this.size + 1;
            return;
        }
        // index -> end
        for(let i = index; i<this.hashTable.length; i++)
        {
            if(this.hashTable[i]==null)
            {
                this.hashTable[i] == newKeyValuePair;
                this.size = this.size + 1;
                return;
            }
        }
        //beginning ->index
        for(let i = 0; i<index; i++)
        {
            if(this.hashTable[i]==null)
            {
                this.hashTable[i] == newKeyValuePair;
                this.size = this.size + 1;
                return;
            }
        }
        if(this.size === this.length)
        {
            rehashTable();
            this.putValue(key,item);
        }
        this.hashTable[index] = newKeyValuePair;
    }

    rehashTable()
    {
        let oldLength = this.length;
        this.length = this.length * 2;
        let hashTableNew = [];
        for(let i=0; i<oldLength; i++)
        {
            if(this.hashTable[i] != null)
            {
                let nullSpotFound = true;
                let newHashCode = this.hashCode(this.hashTable[i].key);
                if(hashTableNew[newHashCode]==null)
                {
                    hashTableNew = this.hashTable[i];
                    nullSpotFound = false;
                }
                //if spot isn't empty linearly probe
                if(nullSpotFound)
                {
                    for(let j = newHashCode; j<this.length; j++)
                    {
                        if(nullSpotFound)
                        {
                            if(hashTableNew[j] == null)
                            {
                                hashTableNew[j] = this.hashTable[i];
                                nullSpotFound = false;
                            }
                        }
                    }
                }
                //if still not found restart from beginning to new hash code
                if(nullSpotFound)
                {
                    for(let j = 0; j < newHashCode; j++)
                    {
                        if(nullSpotFound)
                        {
                            if(hashTableNew[j] == null)
                            {
                                hashTableNew[j] = this.hashTable[i];
                                nullSpotFound = false;
                            }
                        }
                    }
                }
            }
        }
        this.hashTable = hashTableNew;
    }
    
    toString() {
        let text = "[\n";
        for (let i = 0; i < this.length; i++) {
            let kvp = this.hashTable[i];
            let kvpDescription = "null";
            if (kvp != null) {
                kvpDescription = kvp.toString();
            }
            text += "   " + i + ": " + kvpDescription + "\n";
        }
        text += "]\n";
        return text;
    }
};