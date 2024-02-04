export const getHomePageFeatureFlags = <THomeFeature>(
    config: {
        rawConfig: {
            featureFlags: {
              homePage: THomeFeature,
            },
          } 
    },
    override: (flags: THomeFeature) => THomeFeature
  ) => {
    return override(config.rawConfig.featureFlags.homePage);
  };

const EXAMPLE_CONFIG = {
    apiEndpoint: "https://api.example.com",
    apiVersion: "v1",
    apiKey: "1234567890",
    rawConfig: {
      featureFlags: {
        homePage: {
          showBanner: true,
          showLogOut: false,
        },
        loginPage: {
          showCaptcha: true,
          showConfirmPassword: false,
        },
      },
    },
};

const flags = getHomePageFeatureFlags(
    EXAMPLE_CONFIG,
    (defaultFlags) => defaultFlags
);