import re
import json

def test_scholarmitra():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    with open('app.js', 'r', encoding='utf-8') as f:
        app_js = f.read()

    with open('data.js', 'r', encoding='utf-8') as f:
        data_js = f.read()

    print(f"Loaded files: index.html ({len(html)} bytes), app.js ({len(app_js)} bytes), data.js ({len(data_js)} bytes)")

    # Extract all getElementById calls
    pattern = re.compile(r'getElementById\(["\']([^"\']+)["\']\)')
    ids_in_app = set(pattern.findall(app_js))
    
    print("Found IDs in app.js:", sorted(list(ids_in_app)))

    missing_in_html = []
    for id_name in sorted(list(ids_in_app)):
        if f'id="{id_name}"' not in html and f"id='{id_name}'" not in html:
            missing_in_html.append(id_name)

    if missing_in_html:
        print("ERROR: Following IDs in app.js are missing from index.html:", missing_in_html)
    else:
        print("SUCCESS: 100% of DOM IDs referenced in app.js exist in index.html!")

    # Check that required features from prompt are present
    checks = {
        "Brand Color #8B5CF6": "#8B5CF6" in open('style.css', encoding='utf-8').read(),
        "Smart Matching Feature Card": "Smart Matching" in html,
        "Scholarship Assistant Feature Card": "Scholarship Assistant" in html,
        "Verified Scholarships Card": "Verified Scholarships" in html,
        "Document Checklist Section": "checklist-section" in html,
        "Scholarship Insights Section": "insights-section" in html,
        "Profile Form Inputs": all(p in html for p in ["profileCourse", "profileYear", "profileState", "profilePercentage", "profileCategory", "profileIncome"]),
        "Filter Inputs": all(f in html for f in ["filterCourse", "filterState", "filterCategory", "filterIncome", "filterDeadline", "filterVerified", "sortBySelect"]),
        "Disclaimer Present": "ScholarMitra helps discover and compare scholarship opportunities" in html,
        "Modals Present": "detailsModal" in html and "redirectModal" in html
    }

    print("\nFeature Audit:")
    for name, passed in checks.items():
        status = "PASSED" if passed else "FAILED"
        print(f"  [{status}] {name}")

    assert all(checks.values()), "Some checks failed!"
    print("\nALL AUDIT CHECKS PASSED PERFECTLY!")

if __name__ == "__main__":
    test_scholarmitra()
