
# converts an OrgSync waiver output ("orgsync responses.csv")
# to a .js file used by the chrome extension (waiver.js)

# $ python3 orgsync_converter.py
# (requires Python 3)

import csv
import pandas as pd
from hashlib import sha256

excel = pd.read_excel("waiver.xlsx")

output = ""
for index, row in excel.iterrows():
    name = "%s, %s" % (row["Last Name"], row["First Name"])
    hash = sha256(str(name).encode('utf-8')).hexdigest()
    output = output + hash + "\n"

with open("hashed_names.txt", "w") as hashed_names:
    print(output, file=hashed_names)

print("Done!")