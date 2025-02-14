const personalDocuments = (personalDocuments) => {
    return (
      <>
        <div className="flex justify-between items-center border-b border-border-gray-primary mb-3 pb-3">
          <div>Directors’ Identification Documents (NRC / Passport)</div>
          <div className="flex gap-x-5 items-center">
            <InputFile
              inputName="identificationDocument"
              inputValue={personalDocuments.identificationDocument}
              onChange={(e) => handleInputChange(e, "personalDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={personalDocuments?.identificationDocumentVerified}
                onChange={(e) => {
                  handleInputChange(e, "personalDocuments");
                  handleCheckboxChange("personalDocuments", e);
                }}
                inputName="identificationDocumentVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-border-gray-primary mb-3 pb-3">
          <div>Directors’ Passport size photos </div>
          <div className="flex gap-x-5 items-center">
            <InputFile
              inputName="passportPhoto"
              inputValue={personalDocuments.passportPhoto}
              onChange={(e) => handleInputChange(e, "personalDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={personalDocuments?.passportPhotoVerified}
                onChange={(e) => handleInputChange(e, "personalDocuments")}
                inputName="passportPhotoVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-border-gray-primary mb-3 pb-3">
          <div>Proof of residence</div>
          <div className="flex gap-x-5 items-center">
            <InputFile
              inputName="proofOfResidence"
              inputValue={personalDocuments.proofOfResidence}
              onChange={(e) => handleInputChange(e, "personalDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={personalDocuments?.proofOfResidenceVerified}
                onChange={(e) => handleInputChange(e, "personalDocuments")}
                inputName="proofOfResidenceVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>Proof of employment</div>
          <div className="flex gap-x-5 items-baseline">
            <InputFile
              inputName="proofOfEmployment"
              inputValue={personalDocuments.proofOfEmployment}
              onChange={(e) => handleInputChange(e, "personalDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={personalDocuments?.proofOfEmploymentVerified}
                onChange={(e) => handleInputChange(e, "personalDocuments")}
                inputName="proofOfEmploymentVerified"
              />
            </div>
          </div>
        </div>
      </>
    );
  };

const businessDocuments = (businessDocuments) => {
    return (
      <>
        <div className="flex justify-between items-center border-b border-border-gray-primary mb-3 pb-3">
          <div>Partnership Agreement</div>
          <div className="flex gap-x-5 items-center">
            <InputFile
              inputName="partnershipAgreement"
              inputValue={businessDocuments.partnershipAgreement}
              onChange={(e) => handleInputChange(e, "businessDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={businessDocuments?.partnershipAgreementVerified}
                onChange={(e) => handleInputChange(e, "businessDocuments")}
                inputName="partnershipAgreementVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-border-gray-primary mb-3 pb-3">
          <div>Shareholder Agreement</div>
          <div className="flex gap-x-5 items-center">
            <InputFile
              inputName="shareholderAgreement"
              inputValue={businessDocuments.shareholderAgreement}
              onChange={(e) => handleInputChange(e, "businessDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={businessDocuments?.shareholderAgreementVerified}
                onChange={(e) => handleInputChange(e, "businessDocuments")}
                inputName="shareholderAgreementVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-border-gray-primary mb-3 pb-3">
          <div>Certificate of Incorporation&nbsp;</div>
          <div className="flex gap-x-5 items-center">
            <InputFile
              inputName="certificateOfIncorporation"
              inputValue={businessDocuments.certificateOfIncorporation}
              onChange={(e) => handleInputChange(e, "businessDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={
                  businessDocuments?.certificateOfIncorporationVerified
                }
                onChange={(e) => handleInputChange(e, "businessDocuments")}
                inputName="certificateOfIncorporationVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-border-gray-primary mb-3 pb-3">
          <div>Articles of Association</div>
          <div className="flex gap-x-5 items-baseline">
            <InputFile
              inputName="articlesOfAssociation"
              inputValue={businessDocuments.articlesOfAssociation}
              onChange={(e) => handleInputChange(e, "businessDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={businessDocuments?.articlesOfAssociationVerified}
                onChange={(e) => handleInputChange(e, "businessDocuments")}
                inputName="articlesOfAssociationVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>Resolution to borrow</div>
          <div className="flex gap-x-5 items-baseline">
            <InputFile
              inputName="resolutionToBorrow"
              inputValue={businessDocuments.resolutionToBorrow}
              onChange={(e) => handleInputChange(e, "businessDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={businessDocuments?.resolutionToBorrowVerified}
                onChange={(e) => handleInputChange(e, "businessDocuments")}
                inputName="resolutionToBorrowVerified"
              />
            </div>
          </div>
        </div>
      </>
    );
  };

const taxDocuments = (taxDocuments) => {
    return (
      <>
        <div className="flex justify-between items-center border-b border-border-gray-primary mb-3 pb-3">
          <div>Tax clearance Certificate</div>
          <div className="flex gap-x-5 items-center">
            <InputFile
              inputName="taxClearanceCertificate"
              inputValue={taxDocuments.taxClearanceCertificate}
              onChange={(e) => handleInputChange(e, "taxDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={taxDocuments?.taxClearanceCertificateVerified}
                onChange={(e) => handleInputChange(e, "taxDocuments")}
                inputName="taxClearanceCertificateVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-border-gray-primary mb-3 pb-3">
          <div>Tax Registration Certificate</div>
          <div className="flex gap-x-5 items-center">
            <InputFile
              inputName="taxRegistrationCertificate"
              inputValue={taxDocuments.taxRegistrationCertificate}
              onChange={(e) => handleInputChange(e, "taxDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={taxDocuments?.taxRegistrationCertificateVerified}
                onChange={(e) => handleInputChange(e, "taxDocuments")}
                inputName="taxRegistrationCertificateVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-border-gray-primary mb-3 pb-3">
          <div>Credit Reference Bureau report</div>
          <div className="flex gap-x-5 items-center">
            <InputFile
              inputName="creditReferenceBureauReport"
              inputValue={taxDocuments.creditReferenceBureauReport}
              onChange={(e) => handleInputChange(e, "taxDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={taxDocuments?.creditReferenceBureauReportVerified}
                onChange={(e) => handleInputChange(e, "taxDocuments")}
                inputName="creditReferenceBureauReportVerified"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>Confirmation of Banking Details</div>
          <div className="flex gap-x-5 items-baseline">
            <InputFile
              inputName="confirmationOfBankingDetails"
              inputValue={taxDocuments.confirmationOfBankingDetails}
              onChange={(e) => handleInputChange(e, "taxDocuments")}
            />
            <div>
              <InputCheckbox
                labelName={"Verified"}
                inputChecked={
                  taxDocuments?.confirmationOfBankingDetailsVerified
                }
                onChange={(e) => handleInputChange(e, "taxDocuments")}
                inputName="confirmationOfBankingDetailsVerified"
              />
            </div>
          </div>
        </div>
      </>
    );
  };

<Accordion
        heading={"Identify & Personal Documents"}
        renderExpandedContent={() =>
          personalDocuments(addLoanData.personalDocuments)
        }
      />
      <Accordion
        heading={"Business Documents"}
        renderExpandedContent={() =>
          businessDocuments(addLoanData.businessDocuments)
        }
      />

<Accordion
        heading={"Tax & Compliance Documents"}
        renderExpandedContent={() => taxDocuments(addLoanData.taxDocuments)}
      />

// personalDocuments: {
//       identificationDocument: null,
//       identificationDocumentVerified: false,
//       passportPhoto: null,
//       passportPhotoVerified: false,
//       proofOfResidence: null,
//       proofOfResidenceVerified: false,
//       proofOfEmployment: null,
//       proofOfEmploymentVerified: false,
//     },
//     businessDocuments: {
//       partnershipAgreement: null,
//       partnershipAgreementVerified: false,
//       shareholderAgreement: null,
//       shareholderAgreementVerified: false,
//       certificateOfIncorporation: null,
//       certificateOfIncorporationVerified: false,
//       articlesOfAssociation: null,
//       articlesOfAssociationVerified: false,
//       resolutionToBorrow: null,
//       resolutionToBorrowVerified: false,
//     },
// taxDocuments: {
//       taxClearanceCertificate: null,
//       taxClearanceCertificateVerified: false,
//       taxRegistrationCertificate: null,
//       taxRegistrationCertificateVerified: false,
//       creditReferenceBureauReport: null,
//       creditReferenceBureauReportVerified: false,
//       confirmationOfBankingDetails: null,
//       confirmationOfBankingDetailsVerified: false,
//     },