import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { I18nContext } from '../../../contexts/i18n';
import Box from '../../ui/box';
import Typography from '../../ui/typography';
import {
  ALIGN_ITEMS,
  BLOCK_SIZES,
  COLORS,
  DISPLAY,
  FLEX_DIRECTION,
  FONT_WEIGHT,
  TYPOGRAPHY,
  JUSTIFY_CONTENT,
} from '../../../helpers/constants/design-system';
import Button from '../../ui/button';
import Tooltip from '../../ui/tooltip';
import IconWithFallback from '../../ui/icon-with-fallback';
import IconBorder from '../../ui/icon-border';

const AddNetwork = ({
  onBackClick,
  onAddNetworkClick,
  onAddNetworkManuallyClick,
  featuredRPCS,
}) => {
  const t = useContext(I18nContext);

  const infuraRegex = /infura.io/u;

  const nets = featuredRPCS
    .sort((a, b) => (a.ticker > b.ticker ? 1 : -1))
    .slice(0, 8);

  return (
    <Box>
      <Box
        height={BLOCK_SIZES.TWO_TWELFTHS}
        padding={[4, 0, 4, 0]}
        display={DISPLAY.FLEX}
        alignItems={ALIGN_ITEMS.CENTER}
        flexDirection={FLEX_DIRECTION.ROW}
        className="add-network__header"
      >
        <img
          src="./images/caret-left-black.svg"
          alt={t('back')}
          onClick={onBackClick}
          className="add-network__header__back-icon"
        />
        <Typography variant={TYPOGRAPHY.H3} color={COLORS.BLACK}>
          {t('addNetwork')}
        </Typography>
      </Box>
      <Box
        height={BLOCK_SIZES.FOUR_FIFTHS}
        width={BLOCK_SIZES.TEN_TWELFTHS}
        margin={[0, 6, 0, 6]}
      >
        <Typography
          variant={TYPOGRAPHY.H6}
          color={COLORS.UI4}
          margin={[4, 0, 0, 0]}
        >
          {t('addFromAListOfPopularNetworks')}
        </Typography>
        <Typography
          variant={TYPOGRAPHY.H7}
          color={COLORS.UI3}
          margin={[4, 0, 3, 0]}
        >
          {t('popularCustomNetworks')}
        </Typography>
        {nets.map((item, index) => (
          <Box
            key={index}
            display={DISPLAY.FLEX}
            alignItems={ALIGN_ITEMS.CENTER}
            justifyContent={JUSTIFY_CONTENT.SPACE_BETWEEN}
            marginBottom={6}
          >
            <Box display={DISPLAY.FLEX} alignItems={ALIGN_ITEMS.CENTER}>
              <IconBorder size={24}>
                <IconWithFallback
                  icon={item.rpcPrefs.imageUrl}
                  name={item.nickname}
                  size={24}
                />
              </IconBorder>
              <Typography
                variant={TYPOGRAPHY.H7}
                color={COLORS.TEXT_DEFAULT}
                fontWeight={FONT_WEIGHT.BOLD}
                boxProps={{ marginLeft: 2 }}
              >
                {item.nickname}
              </Typography>
            </Box>
            <Box display={DISPLAY.FLEX} alignItems={ALIGN_ITEMS.CENTER}>
              {
                // Warning for the networks that doesn't use infura.io as the RPC
                !infuraRegex.test(item.rpcUrl) && (
                  <Tooltip
                    className="add-network__warning-tooltip"
                    position="top"
                    interactive
                    html={
                      <Box margin={3} className="add-network__warning-tooltip">
                        {t('addNetworkTooltipWarning', [
                          <a
                            key="zendesk_page_link"
                            href="https://metamask.zendesk.com/hc/en-us/articles/4417500466971"
                            rel="noreferrer"
                            target="_blank"
                          >
                            {t('learnMoreUpperCase')}
                          </a>,
                        ])}
                      </Box>
                    }
                    trigger="mouseenter"
                    theme="light"
                  >
                    <img
                      className="add-network__warning-image"
                      src="images/warning-triangle-grey.svg"
                    />
                  </Tooltip>
                )
              }
              <div
                className="add-network__add-button"
                onClick={onAddNetworkClick}
              >
                {t('add')}
              </div>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        height={BLOCK_SIZES.ONE_TWELFTH}
        padding={[4, 4, 4, 4]}
        className="add-network__footer"
      >
        <Button type="link" onClick={onAddNetworkManuallyClick}>
          <Typography variant={TYPOGRAPHY.H6} color={COLORS.PRIMARY1}>
            {t('addANetworkManually')}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

AddNetwork.propTypes = {
  onBackClick: PropTypes.func,
  onAddNetworkClick: PropTypes.func,
  onAddNetworkManuallyClick: PropTypes.func,
  featuredRPCS: PropTypes.array,
};

export default AddNetwork;
