import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
} from 'react-native';

import Colors from '../config/colors';
import { showModal, hideModal } from '../components/CustomModal';
import CustomButton from '../components/CustomButton';


const UserAgreementScreen = props => {
  const { navigation } = props;

  const preamble = `Look, we understand these things are boring. However, this is one is short, and we the developers truly respect you. Please read.`;

  const tosTerms = `By accessing our app, Common Goods, you are agreeing to be bound by these terms of service, \
all applicable laws and regulations, and agree that you are responsible for compliance with any \
applicable local laws. If you do not agree with any of these terms, you are prohibited from using \
or accessing Common Goods. The materials contained in Common Goods are protected by applicable copyright \
and trademark law.`;

  const tosUseLicenseTerms = [
    `a. Permission is granted to temporarily download one copy of Common Goods per device for personal, \
non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:\n`,
    `\ti. modify or copy the materials;\n`,
    `\tii. use the materials for any commercial purpose, or for any public display (commercial or non-commercial);\n`,
    `\tiii. attempt to decompile or reverse engineer any software contained in Common Goods;\n`,
    `\tiv. remove any copyright or other proprietary notations from the materials; or\n`,
    `\tv. transfer the materials to another person or "mirror" the materials on any other server.\n`,
    `b. This license shall automatically terminate if you violate any of these restrictions and may be terminated by \
Common Goods at any time. Upon terminating your viewing of these materials or upon the termination of this license, \
you must destroy any downloaded materials in your possession whether in electronic or printed format.\n`
  ];

  const disclaimerTerms = [
    `The materials within Common Goods are provided on an 'as is' basis. Common Goods makes no warranties, expressed or implied, \
and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, \
fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.\n`,
    `Further, Common Goods does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use \
of the materials on its website or otherwise relating to such materials or on any sites linked to Common Goods.\n`
  ];

  const limitationTerms = `In no event shall Common Goods or its suppliers be liable for any damages (including, without limitation, damages \
for loss of data or profit, or due to business interruption) arising out of the use or inability to use Common Goods, even if Common Goods or \
a Common Goods authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions \
do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.\n`;

  const accuracyOfMaterialsTerms = `The materials appearing in Common Goods could include technical, typographical, or photographic errors. \
Common Goods does not warrant that any of the materials on Common Goods are accurate, complete or current. Common Goods may make changes to \
the materials contained in Common Goods at any time without notice. However Common Goods does not make any commitment to update the materials.`;

  const linksTerms = `Common Goods has not reviewed all of the sites linked to its app and is not responsible for the contents of any such \
linked site. The inclusion of any link does not imply endorsement by Common Goods of the site. Use of any such linked website is at the user's own risk.`;

  const modificationsTerms = `Common Goods may revise these terms of service for its app at any time without notice. By using Common Goods you are agreeing\
to be bound by the then current version of these terms of service.`

  const governingLawTerms = `These terms and conditions are governed by and construed in accordance with the laws of Oregon and you irrevocably submit to \
the exclusive jurisdiction of the courts in that State or location.`

  const privacyHeader = `Privacy Policy`;

  const privacyText = `Your privacy is important to us. It is Common Goods' policy to respect your privacy regarding any information we may \
collect from you through our app, Common Goods. We only ask for personal information when we truly need it to provide a service to you. \
We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used. \
We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within \
commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification. \
We don’t share any personally identifying information publicly or with third-parties, except when required to by law. \
Our app may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices \
of these sites, and cannot accept responsibility or liability for their respective privacy policies. You are free to refuse our request \
for your personal information, with the understanding that we may be unable to provide you with some of your desired services. Your continued \
use of our app will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we \
handle user data and personal information, feel free to contact us. This policy is effective and last revised as of 31 July 2020.`;


  return(
    <ScrollView>
        <View style={styles.screen}>
          <Text style={styles.screenTitle}>{'User Agreements'}</Text>
          <View style={styles.textContainer} behavior='padding'>
            <Text style={styles.bigHeader}>{`Common Goods Terms of Service`}</Text>
            <Text style={styles.tosText}>{preamble}</Text>

            <Text style={styles.subHeader}>{`1. Terms`}</Text>
            <Text style={styles.tosText}>{tosTerms}</Text>

            <Text style={styles.subHeader}>{`2. Use License`}</Text>
            <Text style={styles.tosText}>{tosUseLicenseTerms[0]}</Text>
            <Text style={styles.tosText}>{tosUseLicenseTerms[1]}</Text>
            <Text style={styles.tosText}>{tosUseLicenseTerms[2]}</Text>
            <Text style={styles.tosText}>{tosUseLicenseTerms[3]}</Text>
            <Text style={styles.tosText}>{tosUseLicenseTerms[4]}</Text>
            <Text style={styles.tosText}>{tosUseLicenseTerms[5]}</Text>
            <Text style={styles.tosText}>{tosUseLicenseTerms[6]}</Text>

            <Text style={styles.subHeader}>{`3. Disclaimer`}</Text>
            <Text style={styles.tosText}>{disclaimerTerms[0]}</Text>
            <Text style={styles.tosText}>{disclaimerTerms[1]}</Text>

            <Text style={styles.subHeader}>{`4. Limitations`}</Text>
            <Text style={styles.tosText}>{limitationTerms}</Text>

            <Text style={styles.subHeader}>{`5. Accuracy of materials`}</Text>
            <Text style={styles.tosText}>{accuracyOfMaterialsTerms}</Text>

            <Text style={styles.subHeader}>{`6. Links`}</Text>
            <Text style={styles.tosText}>{linksTerms}</Text>

            <Text style={styles.subHeader}>{`7. Modifications`}</Text>
            <Text style={styles.tosText}>{modificationsTerms}</Text>

            <Text style={styles.subHeader}>{`8. Governing Law`}</Text>
            <Text style={styles.tosText}>{governingLawTerms}</Text>

            <Text style={styles.bigHeader}>{privacyHeader}</Text>
            <Text style={styles.tosText}>{privacyText}</Text>
          </View>

          <View style={styles.buttonContainer}>

            <CustomButton
              style={{...styles.button, ...styles.refuseButton}}
              onPress={() => {
                showModal('UNACCEPTED_TERMS');
                setTimeout(() => {
                  hideModal();
                  navigation.navigate('Login');
                }, 900);
              }}
            >
              <Text style={styles.buttonText}>Refuse</Text>
            </CustomButton>

            <CustomButton
              style={{...styles.button, ...styles.agreeButton}}
              onPress={() => {
                navigation.navigate('Register');
              }}
            >
              <Text style={styles.buttonText}>Agree</Text>
            </CustomButton>
          </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: Colors.light_shade4,
    padding: 20,
  },
  screenTitle: {
    color: Colors.dark_shade1,
    fontFamily: 'open-sans-bold',
    fontSize: 36,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  textContainer: {
    width: '95%',
    textAlign: 'left',
  },
  bigHeader: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 20,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  tosText: {
    fontSize: 16,
    lineHeight: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: '50%',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  refuseButton: {
    backgroundColor: Colors.contrast3,
  },
  buttonText: {
    color: Colors.light_shade1,
    fontSize: 24,
  },
});

export default UserAgreementScreen;
