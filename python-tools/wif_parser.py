#!/usr/bin/env python3
"""
WIF Parser for Weave Draft to p5.js Conversion
Parses WIF files and extracts pattern data for p5.js visualization
"""

import json
import re
from typing import Dict, List, Tuple, Optional

class WIFParser:
    """Parse WIF files and convert to p5.js compatible format"""
    
    def __init__(self, wif_file_path: str):
        self.wif_file_path = wif_file_path
        self.sections = {}
        self.pattern_data = {}
        
    def parse_wif(self) -> Dict:
        """Parse WIF file and extract all sections"""
        with open(self.wif_file_path, 'r') as f:
            content = f.read()
        
        # Split into sections
        sections = re.split(r'\n\[([^\]]+)\]', content)
        
        current_section = None
        for i, section in enumerate(sections):
            if i == 0:
                continue  # Skip content before first section
            
            if i % 2 == 1:  # Section header
                current_section = section.strip()
                self.sections[current_section] = {}
            else:  # Section content
                self._parse_section_content(current_section, section.strip())
        
        return self.sections
    
    def _parse_section_content(self, section_name: str, content: str):
        """Parse individual section content"""
        lines = content.split('\n')
        
        for line in lines:
            line = line.strip()
            if not line or line.startswith(';'):
                continue
                
            if '=' in line:
                key, value = line.split('=', 1)
                key = key.strip()
                value = value.strip()
                
                # Handle different value types
                if section_name in ['THREADING', 'TREADLING', 'TIEUP']:
                    # These are numeric mappings
                    if section_name == 'TIEUP':
                        # Tieup values are comma-separated lists
                        self.sections[section_name][key] = [int(x) for x in value.split(',')]
                    else:
                        self.sections[section_name][key] = int(value)
                elif section_name == 'COLOR TABLE':
                    # Color values are RGB triplets
                    rgb_values = [int(x) for x in value.split(',')]
                    self.sections[section_name][key] = rgb_values
                else:
                    self.sections[section_name][key] = value
    
    def generate_drawdown_matrix(self) -> List[List[int]]:
        """Generate the drawdown matrix from WIF data"""
        threading = self.sections.get('THREADING', {})
        treadling = self.sections.get('TREADLING', {})
        tieup = self.sections.get('TIEUP', {})
        
        if not all([threading, treadling, tieup]):
            raise ValueError("Missing required sections: THREADING, TREADLING, or TIEUP")
        
        # Get dimensions
        warp_threads = len(threading)
        weft_picks = len(treadling)
        
        # Create matrix
        matrix = []
        
        for pick in range(1, weft_picks + 1):
            row = []
            treadle = treadling[str(pick)]
            active_shafts = tieup.get(str(treadle), [])
            
            for thread in range(1, warp_threads + 1):
                shaft = threading[str(thread)]
                
                # If shaft is active, weft is up (1), otherwise warp is up (0)
                if shaft in active_shafts:
                    row.append(1)  # Weft visible
                else:
                    row.append(0)  # Warp visible
            
            matrix.append(row)
        
        return matrix
    
    def get_color_palette(self) -> Dict[str, List[int]]:
        """Extract color palette from WIF"""
        color_table = self.sections.get('COLOR TABLE', {})
        
        # Convert to RGB values (0-255 range)
        colors = {}
        for key, rgb in color_table.items():
            # WIF colors are in 0-999 range, convert to 0-255
            colors[key] = [int(c * 255 / 999) for c in rgb]
        
        return colors
    
    def to_p5js_format(self) -> Dict:
        """Convert WIF data to p5.js compatible format"""
        try:
            matrix = self.generate_drawdown_matrix()
            colors = self.get_color_palette()
            
            # Get metadata
            text_info = self.sections.get('TEXT', {})
            weaving_info = self.sections.get('WEAVING', {})
            
            pattern_data = {
                'name': text_info.get('Title', 'Untitled Pattern'),
                'matrix': matrix,
                'colors': colors,
                'metadata': {
                    'shafts': weaving_info.get('Shafts', 'Unknown'),
                    'treadles': weaving_info.get('Treadles', 'Unknown'),
                    'rising_shed': weaving_info.get('Rising Shed', 'true'),
                    'threading': self.sections.get('THREADING', {}),
                    'treadling': self.sections.get('TREADLING', {}),
                    'tieup': self.sections.get('TIEUP', {})
                }
            }
            
            return pattern_data
            
        except Exception as e:
            raise ValueError(f"Error converting WIF to p5.js format: {str(e)}")
    
    def save_as_json(self, output_path: str):
        """Save pattern data as JSON file"""
        pattern_data = self.to_p5js_format()
        
        with open(output_path, 'w') as f:
            json.dump(pattern_data, f, indent=2)
        
        print(f"Pattern data saved to {output_path}")

def create_moire_pattern(base_pattern: List[List[int]], 
                        scale1: float = 1.0, 
                        scale2: float = 1.2, 
                        rotation: float = 0.0) -> List[List[int]]:
    """Create moire pattern by layering scaled versions"""
    import math
    
    height = len(base_pattern)
    width = len(base_pattern[0]) if height > 0 else 0
    
    # Create new pattern matrix
    moire_pattern = []
    
    for y in range(height):
        row = []
        for x in range(width):
            # Sample from two different scales
            x1 = int((x * scale1) % width)
            y1 = int((y * scale1) % height)
            
            x2 = int((x * scale2) % width)
            y2 = int((y * scale2) % height)
            
            # Apply rotation to second pattern
            if rotation != 0:
                cos_r = math.cos(rotation)
                sin_r = math.sin(rotation)
                x2_rot = int((x2 * cos_r - y2 * sin_r) % width)
                y2_rot = int((x2 * sin_r + y2 * cos_r) % height)
                x2, y2 = x2_rot, y2_rot
            
            # Combine patterns (XOR for moire effect)
            value1 = base_pattern[y1][x1]
            value2 = base_pattern[y2][x2]
            
            # Create moire through interference
            moire_row_value = (value1 + value2) % 2
            row.append(moire_row_value)
        
        moire_pattern.append(row)
    
    return moire_pattern

# Example usage
if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python wif_parser.py <wif_file_path> [output_json_path]")
        sys.exit(1)
    
    wif_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else "pattern_data.json"
    
    try:
        parser = WIFParser(wif_file)
        parser.parse_wif()
        parser.save_as_json(output_file)
        
        print(f"Successfully converted {wif_file} to {output_file}")
        
        # Example: Create moire variation
        pattern_data = parser.to_p5js_format()
        base_matrix = pattern_data['matrix']
        
        moire_matrix = create_moire_pattern(base_matrix, 1.0, 1.3, 0.1)
        
        # Save moire version
        moire_data = pattern_data.copy()
        moire_data['matrix'] = moire_matrix
        moire_data['name'] = f"{pattern_data['name']} - Moire Variation"
        
        moire_output = output_file.replace('.json', '_moire.json')
        with open(moire_output, 'w') as f:
            json.dump(moire_data, f, indent=2)
        
        print(f"Moire variation saved to {moire_output}")
        
    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)