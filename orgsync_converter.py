
# converts an OrgSync waiver output ("orgsync responses.csv")
# to a .js file used by the chrome extension (waiver.js)

# $ python3 orgsync_converter.py
# (requires Python 3)

import csv

with open('orgsync responses.csv', 'r') as orgsync_responses:
    csv = csv.reader(orgsync_responses)
    responses = list(csv)

responses = responses[1:] # remove the header row

# build waiver.js
def name_from_response_row(row):
    # Columns are "Sumbission ID", "Last Name", "First Name", "Email", ...
    return "\t\"" + row[1] + ", " + row[2] + "\","

names = map(name_from_response_row, responses)
javascript_array = "var signed_waiver = [\n" + "\n".join(names) + "\n]"

with open("waiver.js", "w") as waiver_js:
    print(javascript_array, file=waiver_js)

print("Done!")
