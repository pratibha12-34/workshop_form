content = open('frontend/src/components/layout/Sidebar.jsx', 'r', encoding='utf-8').read()

old = '        <div className="sidebar-patriotic-motto">\n          <span>KARTAVYA</span>\n        </div>\n    </aside>'

new = '        <div className="sidebar-patriotic-motto">\n          <span>KARTAVYA</span>\n        </div>\n      </div>\n    </aside>'

if old in content:
    content = content.replace(old, new)
    print('Fixed!')
else:
    print('Not found')
    idx = content.find('sidebar-patriotic-motto')
    if idx >= 0:
        print(repr(content[idx:idx+180]))

open('frontend/src/components/layout/Sidebar.jsx', 'w', encoding='utf-8').write(content)
print('Done')
