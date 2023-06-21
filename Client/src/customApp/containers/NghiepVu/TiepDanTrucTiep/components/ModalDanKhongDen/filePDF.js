import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  ReactPDF,
} from "@react-pdf/renderer";
import Modal from "../../../../../../components/uielements/modal";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    flexDirection: "row",
    color: "#000",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

// Create Document Component
const MyDocument = (props) => {
  const { open, data, cancel } = props;
  return (
    <Modal title={"In Phiếu"} open={open} onCancel={cancel} width={"90%"}>
      <PDFViewer style={styles.viewer}>
        {/* Start of the document*/}
        <Document>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>UBND TỈNH</Text>
            </View>
            <View style={styles.section}>
              <Text>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Modal>
  );
};

export default MyDocument;
