import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Layout, LegacyCard, SkeletonBodyText, SkeletonDisplayText, SkeletonPage, Tabs, TextContainer } from "@shopify/polaris";
import { tabs } from "../../../constant";
import TabsProvider from "../TabsProvider/TabsProvider";
import styles from "../FormStyle.module.css";

const FormSidebar = ({ isEdit }) => {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );
  const editFormData = useSelector((state) => state?.inputField?.editFormData);

  return (
    <div>
      {editFormData?.loading ? (
        <div className={styles.leftContext}>
          <SkeletonPage primaryAction>
            <Layout>
              <Layout.Section>
                <LegacyCard sectioned>
                  <TextContainer>
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText />
                  </TextContainer>
                </LegacyCard>
                <LegacyCard sectioned>
                  <TextContainer>
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText />
                  </TextContainer>
                </LegacyCard>
                <LegacyCard sectioned>
                  <TextContainer>
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText />
                  </TextContainer>
                </LegacyCard>
                <LegacyCard sectioned>
                  <TextContainer>
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText />
                  </TextContainer>
                </LegacyCard>
              </Layout.Section>
            </Layout>
          </SkeletonPage>
        </div>
      ) : (
        <div className={styles.leftContext}>
          <div>
            <Tabs
              {...{
                tabs,
                selected,
                fitted: true,
                onSelect: handleTabChange,
              }}
            >
              <div className={styles.tabContent}>
                <TabsProvider
                  {...{
                    isEdit,
                    currentTab: ["elements", "settings"][selected],
                  }}
                />
              </div>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormSidebar;
