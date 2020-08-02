import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import Colors from '../config/colors';
import { showModal, hideModal } from '../components/CustomModal';


const UserAgreementScreen = props => {
  const { navigation } = props;

  const tosText = `Common Goods Terms of Service
  1. Terms
  By accessing our app, Common Goods, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing Common Goods. The materials contained in Common Goods are protected by applicable copyright and trademark law.

  2. Use License
  Permission is granted to temporarily download one copy of Common Goods per device for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
  modify or copy the materials;
  use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
  attempt to decompile or reverse engineer any software contained in Common Goods;
  remove any copyright or other proprietary notations from the materials; or
  transfer the materials to another person or "mirror" the materials on any other server.
  This license shall automatically terminate if you violate any of these restrictions and may be terminated by Common Goods at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
  3. Disclaimer
  The materials within Common Goods are provided on an 'as is' basis. Common Goods makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
  Further, Common Goods does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to Common Goods.
  4. Limitations
  In no event shall Common Goods or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Common Goods, even if Common Goods or a Common Goods authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.

  5. Accuracy of materials
  The materials appearing in Common Goods could include technical, typographical, or photographic errors. Common Goods does not warrant that any of the materials on Common Goods are accurate, complete or current. Common Goods may make changes to the materials contained in Common Goods at any time without notice. However Common Goods does not make any commitment to update the materials.

  6. Links
  Common Goods has not reviewed all of the sites linked to its app and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Common Goods of the site. Use of any such linked website is at the user's own risk.

  7. Modifications
  Common Goods may revise these terms of service for its app at any time without notice. By using Common Goods you are agreeing to be bound by the then current version of these terms of service.

  8. Governing Law
  These terms and conditions are governed by and construed in accordance with the laws of Oregon and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.`;

  const privacyText = `Privacy Policy
  Your privacy is important to us. It is Common Goods' policy to respect your privacy regarding any information we may collect from you through our app, Common Goods.
  
  We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
  
  We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
  
  We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
  
  Our app may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
  
  You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
  
  Your continued use of our app will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
  
  This policy is effective as of 31 July 2020.`;


  return(
    <ScrollView style={styles.container}>
        <View style={styles.screen}>
          <Text style={styles.screenTitle}>{'User Agreements'}</Text>
          <View style={styles.inputContainer} behavior='padding'>
            <Text>
              {tosText}
            </Text>
            <Text>
              {privacyText}
            </Text>

          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}
          >
            <Text>I Agree</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              showModal('UNACCEPTED_TERMS');
              setTimeout(() => {
                  hideModal();
                  navigation.navigate('Login');
                }, 900);
            }}
          >
            <Text>Refuse</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.light_shade4,
  },
  screenTitle: {
    color: Colors.dark_shade1,
    fontFamily: 'open-sans-bold',
    fontSize: 36,
    textAlign: 'center',
    marginTop: 20,
  },
  inputContainer: {
    width: '80%',
  },
  inputText: {
    width: '80%',
    color: Colors.dark_shade1,
  },
  icon: {
    width: '10%',
  },
  buttonText: {
    color: Colors.light_shade1,
    fontSize: 24,
  }
});

export default UserAgreementScreen;
