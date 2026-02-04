#!/bin/bash

# Find files with duplicate contents (>= 1MB)

declare -A checksums

# Find all files >= 1MB and compute their checksums
while IFS= read -r -d '' file; do
    checksum=$(md5sum "$file" 2>/dev/null | cut -d' ' -f1)
    if [[ -n "$checksum" ]]; then
        checksums["$checksum"]+="$file"$'\n'
    fi
done < <(find "${1:-.}" -type f -size +1M -print0 2>/dev/null)

# Print duplicates
for checksum in "${!checksums[@]}"; do
    files="${checksums[$checksum]}"
    # Count number of files (count newlines)
    count=$(echo -n "$files" | grep -c '^')
    if [[ $count -gt 1 ]]; then
        echo "Duplicate files (md5: $checksum):"
        echo "$files" | sed '/^$/d' | sed 's/^/  /'
        echo
    fi
done
