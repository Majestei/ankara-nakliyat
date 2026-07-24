import os
import glob
import re

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Colors
    content = re.sub(r'bg-blue-600', 'bg-primary-500', content)
    content = re.sub(r'bg-blue-500', 'bg-primary-500', content)
    content = re.sub(r'text-blue-600', 'text-primary-500', content)
    content = re.sub(r'text-blue-500', 'text-primary-400', content)
    content = re.sub(r'border-blue-600', 'border-primary-500', content)
    content = re.sub(r'border-blue-100', 'border-primary-900/30', content)
    content = re.sub(r'bg-blue-50', 'bg-primary-950/30', content)
    content = re.sub(r'shadow-blue-600', 'shadow-primary-500', content)
    content = re.sub(r'shadow-blue-900', 'shadow-primary-900', content)
    
    content = re.sub(r'bg-emerald-50', 'bg-secondary-950/30', content)
    content = re.sub(r'bg-emerald-600', 'bg-secondary-500', content)
    content = re.sub(r'text-emerald-600', 'text-secondary-400', content)

    # Dark mode shifting
    content = re.sub(r'\bbg-white\b', 'bg-dark-900', content)
    content = re.sub(r'\bbg-gray-50\b', 'bg-dark-800', content)
    content = re.sub(r'\btext-gray-900\b', 'text-white', content)
    content = re.sub(r'\btext-gray-800\b', 'text-gray-100', content)
    content = re.sub(r'\btext-gray-600\b', 'text-gray-300', content)
    content = re.sub(r'\btext-gray-500\b', 'text-gray-400', content)
    content = re.sub(r'\bborder-gray-50\b', 'border-white/5', content)
    content = re.sub(r'\bborder-gray-100\b', 'border-white/10', content)
    content = re.sub(r'\bborder-gray-200\b', 'border-white/20', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            replace_in_file(os.path.join(root, file))

print("Done")
