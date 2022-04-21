if [ $1 ]; then
  git add .
  git commit -m "$1 $2 $3 $4"
  git push origin master
else
  echo "commitしていない"
fi


npm run build

firebase deploy

# firebase deploy --only firestore:rules
# firebase hosting:channel:deploy cramel-test