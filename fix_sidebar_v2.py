

old = '''      <div className="sidebar-footer">

          <Languages size={18} />
          <span>{lang === 'en' ? 'Hindi' : 'English (ENG)'}</span>
        </button>

        </div>'''

new = '''      <div className="sidebar-footer">
        <button className="language-toggle-btn" onClick={toggleLanguage}>
          <Languages size={18} />
          <span>{lang === 'en' ? 'Hindi' : 'English (ENG)'}</span>
        </button>
        <div className="sidebar-patriotic-motto">
          <span>KARTAVYA</span>
        </div>'''

if old in content:
    content = content.replace(old, new)
    print('Fixed sidebar-footer!')
else:
    print('Could not find the old fragment')
    # Find around sidebar-footer
    idx = content.find('sidebar-footer')
    if idx >= 0:
        print('Found at index:', idx)
        print(repr(content[idx:idx+300]))

open('frontend/src/components/layout/Sidebar.jsx', 'w', encoding='utf-8').write(content)
print('Written successfully')
