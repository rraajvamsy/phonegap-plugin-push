var fs = require('fs');
module.exports = function(context) {
    var projectLocation = __dirname + '/../../../';

    function copyGoogleServicesJSON() {
        // destination.txt will be created or overwritten by default.
        fs.copyFile(projectLocation + 'www/google-services.json', projectLocation + 'platforms/android/app/google-services.json', function(err) {
            if (err) {
                console.warn('google-services.json is not copied');
                console.error(err);
                return;
            }
            console.log('google-services.json is copied');
        });
    }

    function updateBuildGradle() {
        var buildGradlePath = projectLocation + 'platforms/android/build.gradle';
        var contents = fs.readFileSync(buildGradlePath).toString();
        var allprojectsIndex = contents.indexOf('allprojects'),
            jcenterIndex = contents.indexOf('jcenter()', allprojectsIndex),
            googleIndex = contents.indexOf('google()', allprojectsIndex);

        if ((googleIndex < 0 || googleIndex > jcenterIndex) && jcenterIndex !== -1 && googleIndex !== -1) {
            contents = contents.slice(0, jcenterIndex) + "google()\n\t\t" + contents.slice(jcenterIndex);
            fs.writeFileSync(buildGradlePath, contents, 'utf8');
            console.log("Updated build.gradle with google repo as before to jcenter");
        }
    }

    copyGoogleServicesJSON();
    updateBuildGradle();
};
