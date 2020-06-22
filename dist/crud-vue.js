const crud = {
    _NON_WORD_REGEXP : /[^\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]+/g,
    _CAMEL_CASE_REGEXP : /([\u0061-\u007A\u00B5\u00DF-\u00F6\u00F8-\u00FF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0561-\u0587\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7FA\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A])([\u0041-\u005A\u00C0-\u00D6\u00D8-\u00DE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA\uFF21-\uFF3A\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g,
    _TRAILING_DIGIT_REGEXP : /([\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])([^\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g,
    _resources : {},
    _resources_loaded : {},
    pluginsPath : '',
    _wait_istances : [],
};
crud.lang = {
    'app.aggiungi' : 'Aggiungi',
    'app.annulla' : 'Annulla',
    'app.attenzione' : 'Attenzione',
    'app.azioni' : 'Azioni',
    'app.cancella' : 'Cancella elemento',
    'app.cancella-selezionati' : 'Cancella elementi selezionati',
    'app.cancellazione-successo' : 'Cancellazione avvenuta con successo',
    'app.carico' : 'Carico...',
    'app.cerca' : 'Cerca',
    'app.conferma-cancellazione' : 'Sicuro di voler cancellare l\'elemento?',
    'app.conferma-multidelete' : 'Sei sicuro di voler cancellare (0) elementi selezionati?',
    'app.estensioni-accettate' : 'Estensioni accettate:',
    'app.errore' : 'Errore',
    'app.indietro' : 'Indietro',
    'app.informazione' : 'Informazione',
    'app.limite-raggiunto' : 'Non è più possibile aggiungere altri elementi',
    'app.modifica' : 'Modifica',
    'app.nessun-elemento' : 'Nessun elemento trovato',
    'app.no' : 'No',
    'app.nuovo' : 'Nuovo',
    'app.ok' : 'Ok',
    'app.ordina' : 'Ordina',
    'app.reset' : 'Reset',
    'app.richiesta-conferma' : 'Richiesta di Conferma',
    'app.salva' : 'Salva',
    'app.salvataggio-ok' : 'Salvataggio avvenuto con successo!',
    'app.seleziona' : 'Seleziona',
    'app.si' : 'Si',
    'app.vista' : 'Vista',
};

crud.icons = {
    mimetypes: {
        "default": 'fa fa-file-o',
        "application/xls": 'fa fa-file-excel-o',
        "xlsx": 'fa fa-file-excel-o',
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": 'fa fa-file-excel-o',
        "zip": 'fa fa-file-archive-o',
        "mp3": 'fa fa-audio-o',
        "image/jpeg": "fa fa-image-o",
        "application/pdf": "fa fa-file-pdf-o",
        "txt": "fa fa-file-text-o",
    }
};


crud.mimetypes = {
    icons : {
        "default": 'fa fa-file-o',
        "application/xls": 'fa fa-file-excel-o',
        "xlsx": 'fa fa-file-excel-o',
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": 'fa fa-file-excel-o',
        "zip": 'fa fa-file-archive-o',
        "mp3": 'fa fa-audio-o',
        "image/jpeg": "fa fa-image-o",
        "application/pdf": "fa fa-file-pdf-o",
        "txt": "fa fa-file-text-o",
        "text/plain" : "fa fa-file-text-o",
    },
    docTypes : [
        "application/xls",
        "xlsx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "zip",
        "mp3",
        "application/pdf",
        "txt",
        "csv",
        "text/plain"
    ],
    imageTypes : [
        "image/jpeg",
        "image/png"
    ]
}

crud.actions = {
    'action-edit' : {
        type : 'record',
        title : 'app.modifica',
        css: 'btn btn-outline-secondary btn-sm',
        text : '',
        icon : 'fa fa-edit',
        execute : function () {
            var url = "/edit/" + this.view.modelName + "/" + this.modelData[this.view.primaryKey];
            document.location.href=url
        }
    },
    'action-view' : {
        type : 'record',
        title : 'app.vista',
        css: 'btn btn-outline-secondary btn-sm ',
        icon : 'fa fa-eye',
        text : '',
        execute : function () {
            var url = this.$crud.application.useRouter?'#':'';
            url += "/view/" + this.view.modelName + "/" + this.modelData.id;
            document.location.href=url;
        }
    },
    'action-delete' : {
        type : 'record',
        title : 'app.cancella',
        css: 'btn btn-outline-danger btn-sm ',
        icon : 'fa fa-times',
        text : '',
        setRouteValues : function(route) {
            var that = this;
            route.setValues({
                modelName: that.view.modelName,
                pk : that.modelData[that.view.primaryKey]
            });
            return route;
        },
        execute : function () {
            var that = this;
            that.confirmDialog(that.$crud.lang['app.conferma-cancellazione'] ,{
                ok : function () {
                    var r = that.createRoute('delete');
                    that.setRouteValues(r);
                    Server.route(r,function (json) {
                        if (json.error) {
                            that.errorDialog(json.msg);
                            return ;
                        }
                        that.popoverSuccess('app.cancellazione-successo')
                        that.view.reload();
                    });
                }
            });
        }
    },
    'action-save-row' : {
        type: 'record',
        title: 'app.salva',
        css: 'btn btn-outline-success btn-sm ',
        text: '',
        icon: 'fa fa-save',
        visible: false,
        setRouteValues : function(route) {
            var that = this;
            route.setValues({
                modelName: that.view.modelName,
                pk : that.modelData[that.view.conf.primaryKey]
            });
            return route;
        },
        execute: function () {
            var that = this;
            var values = {};
            for (var k in that.view.widgetsEdit[that.index]) {
                //console.log('edit r',that.view.widgetsEdit[that.index][k])
                var sref = that.view.widgetsEdit[that.index][k].cRef; //  're-' + that.index + '-' +  k;
                if (that.$crud.cRefs[sref])
                    values[k] = that.$crud.cRefs[sref].getValue();
            }
            var id = that.view.value[that.index][that.view.conf.primaryKey];
            var r = that.createRoute('update');
            that.setRouteValues(r);
            r.setParams(values);
            Server.route(r, function (json) {
                if (json.error) {
                    that.errorDialog(json.msg);
                    return;
                }
                that.popoverSuccess(that.translate('app.salvataggio-ok'))
                that.view.reload();
            })
            console.log('values', values);
        }
    },
    'action-edit-mode':  {
        type : 'record',
        title : 'app.modifica',
        css: 'btn btn-outline-secondary btn-sm ',
        text : '',
        icon : 'fa fa-edit',
        execute : function () {
            var that = this;
            that.view.setEditMode(that.index);
        }
    },
    'action-view-mode' : {
        type : 'record',
        title : 'app.annulla',
        css: 'btn btn-outline-secondary btn-sm ',
        //text : 'back',
        icon : 'fa fa-arrow-left',
        visible : false,
        execute : function () {
            var that = this;
            that.view.setViewMode(that.index);
        }
    },
    'action-insert' : {
        type : 'collection',
        visible : true,
        enabled : true,
        title : 'app.nuovo',
        css: 'btn btn-outline-primary btn-sm btn-group mr-1',
        icon : 'fa fa-plus',
        text : 'app.nuovo',
        execute  :function () {
            var url = "/insert/" + this.view.modelName + "/new";
            document.location.href=url;
        }
    },
    'action-save' : {
        type : 'collection',
        title : 'app.salva',
        css: 'btn btn-primary btn-sm mr-1',
        icon : 'fa fa-save',
        text : 'app.salva',
        setRouteValues : function(route) {
            var that = this;
            if (that.view.cPk) {
                route.setValues({
                    modelName: that.view.modelName,
                    pk : this.view.cPk
                });
            } else {
                route.setValues({
                    modelName: that.view.modelName,
                });
            }
            route.setParams(that.view.getViewData());
            return route;
        },
        execute : function (callback) {
            var that = this;
            console.log('action save',this);
            var rName = 'create';
            if (that.view.cPk)
                rName = 'update';
            var r = that._getRoute(rName);
            that.setRouteValues(r);
            Server.route(r, function (json) {
                if (json.error) {
                    that.errorDialog(json.msg)
                    return ;
                }
                that.popoverSuccess('app.salvataggio-ok');
                callback();
            })
        }
    },
    'action-back' : {
        type : 'collection',
        title : 'app.indietro',
        css: 'btn btn-secondary btn-sm mr-1',
        icon : 'fa fa-backward',
        text : 'app.indietro',
        execute : function () {
            window.history.back();
        }
    },
    'action-search' : {
        type : 'collection',
        title : 'app.cerca',
        css: 'btn btn-primary btn-sm btn-group mr-1',
        icon : 'fa fa-search',
        text : 'app.cerca',
        execute : function () {
            console.log('action-search',this,'view',this.view.targetRef);
            if (this.view && this.view.targetRef) {
                console.log('target ref',this.view.targetRef);
                var targetView = this.$crud.cRefs[this.view.targetRef];
                var formData = this.view.getViewData();
                formData['page'] = 1;
                targetView.route.setParams(formData);
                targetView.reload();
                return ;
            }
        }
    },
    'action-reset' : {
        type : 'collection',
        title : 'app.reset',
        css: 'btn btn-primary btn-sm btn-group mr-1',
        //icon : 'fa fa-search',
        text : 'app.reset',
        execute : function () {
            if (this.view) {
                console.log('target ref',this.view.targetRef);
                //var targetView = this.$crud.cRefs[this.view.targetRef];
                this.view.reset();
                // formData['page'] = 1;
                // targetView.route.setParams(formData);
                // targetView.reload();
                return ;
            }
        }
    },
    'action-order' : {
        type : 'collection',
        title : 'app.order',
        css: 'btn btn-default btn-sm mr-1',
        iconSortAsc : 'fa fa-sort-asc',
        iconSortDesc : 'fa fa-sort-desc',
        iconSort : 'fa fa-sort',
        icon : null,
        text : '',
        execute : function () {
            console.log('order execute',this);
            var params = this.view.route.getParams();
            params.order_field = this.orderField;
            params.order_direction = (!this.orderDirection || this.orderDirection.toLowerCase() == 'desc')?'ASC':'DESC';
            this.view.route.setParams(params);
            this.view.reload();
        }
    },
    'action-delete-selected' : {
        type : 'collection',
        title : 'app.cancella-selezionati',
        css: 'btn btn-outline-danger btn-sm mr-1',
        icon : 'fa fa-trash',
        text : '',
        needSelection : true,
        setRouteValues : function(route) {
            var that = this;
            route.setValues({
                modelName: that.view.modelName,
            });
            return route;
        },
        execute : function () {
            var that = this;
            var checked = that.view.selectedRows();
            var num = checked.length;
            if (num === 0)
                return ;
            that.confirmDialog(that.translate('app.conferma-multidelete',false,[num]), {
                ok : function () {
                    var r = that.createRoute('multi-delete');
                    that.setRouteValues(r);
                    r.setParams({'ids': checked});
                    that.waitStart();
                    Server.route(r,function (json) {
                        that.waitEnd();
                        if (json.error) {
                            that.errorDialog(json.msg);
                            return ;
                        }
                        that.view.reload();
                        //that.callback(json);
                    })
                }
            });
            console.log('selected',that.view.selectedRows())
        }
    }
};

crud.conf = {
    view : {
        primaryKey : 'id',
        routeName : 'view',
        fieldsConfig : {},
        //actions : ['action-back'],
        actions : [],
        customActions: {},
        widgetTemplate : 'tpl-record2',
    },
    edit : {
        primaryKey : 'id',
        routeName : 'edit',
        customActions : {},
        fieldsConfig : {
            id : 'w-hidden'
        },
        fields : [],
        widgetTemplate : 'tpl-record',
        actions : ['action-save','action-back']
    },
    list : {
        primaryKey : 'id',
        routeName : 'list',
        customActions: {},
        fieldsConfig : {},
        orderFields: {},
        widgetTemplate : 'tpl-list',
        actions : ['action-insert','action-delete-selected','action-view','action-edit','action-delete']
    },
    listEdit : {
        routeName : 'list',
        primaryKey : 'id',
        customActions: {},
        fieldsConfig : {},
        orderFields: {},
        widgetTemplate : 'tpl-list',
        actions : [
            'action-insert',
            'action-delete-selected',
            'action-view',
            'action-edit-mode',
            'action-delete',
            'action-save-row',
            'action-view-mode'
        ]
    },
    search : {
        primaryKey : 'id',
        routeName : 'search',
        actions : ['action-search','action-reset'],
        fieldsConfig : {},
        customActions: {},
        widgetTemplate : 'tpl-record',
    },
    insert : {
        primaryKey : 'id',
        routeName : 'insert',
        widgetTemplate : 'tpl-record',
        actions : ['action-save','action-back'],
        fieldsConfig : {
            id : 'w-hidden'
        },
        actions : ['action-save','action-back']
    },
    // uploadFile : {
    //     routeName : null,
    //     fields : ['nome','descrizione','modelName'],
    //     fieldsConfig : {
    //         modelName : {
    //             type : 'w-hidden'
    //         },
    //         descrizione : {
    //             type : 'w-textarea'
    //         }
    //     }
    // }
};

crud.routes =  {
    list : {
        method      : 'get',
        url         : '/foorm/{modelName}',
        resultType  : 'list',
        protocol    : 'list',
        commonParams  : {},  //parametri statici da aggiungere sempre alla chiamata
        values : {}, // vettore associativo dei parametri per la costruzione dell'url
        params :{},
    },
    uploadfile : {
        method      : 'post',
        //url         : '/api/json/{modelName}/uploadfile',
        url         : '/uploadfile',
        resultType  : 'record',
        protocol    : 'record',
        commonParams  : {},  //parametri statici da aggiungere sempre alla chiamata
        values : {}, // vettore associativo dei parametri per la costruzione dell'url
        params :{},
    },
    upload : {
        method      : 'post',
        url         : '/upload',
        resultType  : 'record',
        protocol    : 'record',
        commonParams  : {},  //parametri statici da aggiungere sempre alla chiamata
        values : {}, // vettore associativo dei parametri per la costruzione dell'url
        params :{},
    },
    insert : {
        method      : "get",
        url         :'/foorm/{modelName}/new',
        resultType  : 'record',
        protocol    : 'record',
        type : 'create',
    },
    update : {
        method      : "post",
        url         :'/foorm/{modelName}/{pk}',
        resultType  : 'record',
        protocol    : 'record',
        type : 'update',
        commonParams : {_method:'PUT'}
    },
    create : {
        method      : "post",
        url         :'/foorm/{modelName}',
        resultType  : 'record',
        protocol    : 'record',
        type : 'create',
        commonParams : {_method:'POST'}
    },
    edit : {
        method      : "get",
        url         :'/foorm/{modelName}/{pk}/edit',
        //url         :'/foorm/{modelName}/{pk}/edit',
        resultType  : 'record',
        protocol    : 'record',
        type : 'update',
    },
    search : {
        method      : "get",
        url         :'/foorm/{modelName}/search',
        //url         :'/foorm/{modelName}/{pk}/edit',
        resultType  : 'record',
        protocol    : 'record'
    },
    view : {
        method      : "get",
        url         :'/foorm/{modelName}/{pk}/view',
        resultType  : 'record',
        protocol    : 'record',
        type : 'read',
    },
    delete : {
        method      : "post",
        url         :'/foorm/{modelName}/{pk}',
        resultType  : 'record',
        protocol    : 'record',
        type : 'delete',
        commonParams : {_method:'DELETE'}
    },
    'multi-delete' : {
        method      : "post",
        url         :'/foorm/{modelName}/multi-delete',
        resultType  : 'record',
        protocol    : 'record',
        type : 'delete'
    },
    autocomplete : {
        method      : "get",
        url         : '/api/json/{modelName}/autocomplete',
        resultType  : 'list',
        protocol    : 'list'

    },
    set : {
        method      : "post",
        url         : '/api/json/set/{modelName}/{field}/{value}',
        resultType  : 'record',
        protocol    : 'record'
    }
};

crud.cRefs = {};

crud.components = {
    widgets : {

    },
    views : {

    },
    actions : {

    },
    misc :  {

    }
};


const dialogs_mixin = {
    methods : {
        messageDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String || bodyProps instanceof Array) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.misc.dMessage({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
            return ;
        },
        errorDialog : function (bodyProps,callbacks) {
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String || bodyProps instanceof Array) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.misc.dError({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
        },

        confirmDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String || bodyProps instanceof Array) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.misc.dConfirm({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
        },

        warningDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String || bodyProps instanceof Array) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.misc.dWarning({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
        },

        customDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            var _cbs = callbacks?callbacks:{};
            if (!bodyProps || typeof bodyProps === 'string' || bodyProps instanceof String || bodyProps instanceof Array) {
                props = {
                    cContent : bodyProps,
                    cCallbacks : _cbs,
                }
            } else {
                props = bodyProps;
                if (Object.keys(_cbs) > 0)
                    props.cCallbacks = _cbs;
            }

            var d = new crud.components.misc.dCustom({
                propsData : props,
                //methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
        },

        popover : function (message,classes,time) {
            this._popover(message,classes,time);
        },

        popoverSuccess : function (message,time) {
            this._popover(message,'alert alert-success',time);
        },
        popoverError : function (message,time) {
            this._popover(message,'alert alert-danger',time);
        },
        popoverInfo : function (message,time) {
            this._popover(message,'alert alert-info',time);
        },
        popoverWarning : function (message,time) {
            this._popover(message,'alert alert-warning',time);
        },

        _popover : function (message,classes,time) {
            var that = this;
            var id= 'pop' + (new Date().getTime());
            _cls = 'alert alert-primary ' + (classes?classes:'');
            var content = that.translate(message);
            var _t = 2000;
            if( time === 0 ){
                content += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
                    '    <span aria-hidden="true">&times;</span>\n' +
                    '  </button>';
            } else if (time) {
                _t = time;
            }
            var top  = window.pageYOffset || document.documentElement.scrollTop;
            var style = 'position:absolute;z-index:100000;width:50%;left:25%;top:'+top+'px';
            jQuery('body').prepend('<div id="'+id+'" class="' + _cls +'" style="' + style + '">' + content +'</div>');
            if (time !== 0) {
                setTimeout(function() {
                    jQuery('#'+id).remove();
                }, _t);
            }
            jQuery('#'+id).popover('show');
        }
    }
}

core_mixin = {
    methods : {
        waitStart : function (msg,container) {
            var that = this;
            var c = container?container:'body';
            var id = that._createContainer(c);

            var comp = new that.$crud.components.misc.cWait({
                propsData: {
                    cMsg : msg,
                    cGlobal : (container==='body')?true:false,
                }
            })
            comp.$mount('#'+id);
            that.$crud._wait_istances.push(comp);
            return comp;
        },
        waitEnd : function (component) {
            var that = this;
            if (that.$crud._wait_istances.length == 0)
                return ;
            if (component) {
                for (var i in that.$crud._wait_istances) {
                    var comp =that.$crud._wait_istances[i];
                    if (comp._uid == component._uid) {
                        that.$crud._wait_istances.splice(i,1);
                    }
                }
            } else {
                var comp = that.$crud._wait_istances.pop();
                comp.$destroy();
                comp.$el.parentNode.removeChild(comp.$el);
            }
        },

        _createContainer : function (container) {
            var id= 'd' + (new Date().getTime());
            jQuery(container).append('<div id="'+id+'" ></div>');
            return id;
        },

        /**
         * ritorna la traduzione della chiave passata presente nel vettore $lang altrimenti ritorna al chiave stessa
         * @param key
         * @param plural
         * @param params
         * @returns {*}
         */
        translate : function (key,plural,params) {
            return this._translate(key,plural,params);
            //return translations_interface._translate.apply(this,[key,plural,params]);
        },
        /**
         * esegue la traduzione solo se esiste la chiave corrispondente nel vettore $lang
         * @param key
         * @param plural
         * @param params
         * @returns {string|*}
         */
        hasTranslation : function (key) {
            if (this.$crud.lang[key])
                return true;
            return false;
        },

        _translate : function (key,plural,params) {
            var testi = this.$crud.lang[key];
            if (!testi)
                return key;
            testi = testi.split('|');
            var testo = (plural && testi.length>1)?testi[1]:testi[0];
            //console.log('testi',testi);
            if (params instanceof Array) {
                for (var i = 0; i < params.length; i++) {
                    testo= testo.replace("(" + i +")", params[i] );
                }
            }
            return testo;
        },
        /**
         * istanzia una nuova route a partire dalla configurazione trovata in crud
         * @param routeName : nome della configurazione della route
         */
        createRoute : function(routeName) {
            var routeConf = this.$crud.routes[routeName];
            if (!routeConf)
                throw "Impossibile trovare la route " + routeName;
            return new Route(routeConf);
        },
        /**
         * cerca e crea la classe protocol utilizzando come naming
         * Protocol+pascalCase(name)
         * @param name : nome su cui viene applicata la funzione pascalCase e aggiunt il prefisso Protocol.
         * esempio se passiamo come nome mio_prot cerchera' di istanziare la class ProtocolMioProt.
         */
        createProtocol : function(name) {
            var className = "Protocol" + this.pascalCase(name);
            try {
                //return new window[className]();
                return eval('new ' + className + '()');
            } catch (e) {
                console.error('failed to create ' + className,e);
            }
        },

        getDescendantProp : function(obj, desc) {
            var arr = desc.split(".");
            while(arr.length && (obj = obj[arr.shift()]));
            return obj;
        },

        getFormData : function (form) {
            var that = this;

            var _serializeAssoc = function (form) {
                var ss = form.serializeArray();
                var data = {};
                for (var i in ss) {
                    var key = ss[i].name;
                    var value = ss[i].value;
                    if (key.indexOf('[') >= 0) {
                        if (!data[key])
                            data[key] = [];
                        data[key].push(value);
                    } else {
                        data[key] = value;
                    }
                }
                return data;
            }




            //var form = that.jQe('form[name="data_form"]');
            if (form && form.length === 0) {
                that.app.log.error('form not found!');
                return {};
            }
            if (typeof tinyMCE !== 'undefined') {
                tinyMCE.triggerSave();
            }
            var formData =  _serializeAssoc(form);//form.serializeAssoc();
            var postData = {}
            // trasformo tutti gli [d] in [] questa modifica e' fatta per gestire i radio button negli hasmany
            // altrimenti venivano raggruppati come un unica entita'
            for( var k in formData) {
                if (formData[k].constructor !== Array) {
                    postData[k] = formData[k];
                    continue;
                }
                var pattern = /(.+)(\[\d+\])(.*)$/g;
                var match = pattern.exec(k);
                if (match && match.length == 4) {
                    var newkey = match[1] + '[]' + match[3];
                    if (!postData[newkey])
                        postData[newkey] = [];
                    postData[newkey].push(formData[k]);
                    delete formData[k];
                } else {
                    postData[k] = formData[k];
                }
            }
            return postData;
        },
        // funzioni trasformazioni standard case
        sentenceCase : function (str) {
            if (str == null) {
                return '';
            }

            return String(str)
            // Enables camel case support.
                .replace(this.$crud._CAMEL_CASE_REGEXP, '$1 $2')
                // Add a space after any digits.
                .replace(this.$crud._TRAILING_DIGIT_REGEXP, '$1 $2')
                // Remove all non-word characters and replace with a single space.
                .replace(this.$crud._NON_WORD_REGEXP, ' ')
                // Trim whitespace around the string.
                .replace(/^ | $/g, '')
                // Finally lower case the entire string.
                .toLowerCase();
        },
        camelCase : function (string) {
            return this.sentenceCase(string)
            // Replace periods between numeric entities with an underscore.
                .replace(/(\d) (?=\d)/g, '$1_')
                // Replace spaces between words with a string upper cased character.
                .replace(/ (\w)/g, function (_, $1) {
                    return $1.toUpperCase();
                });
        },
        costantCase : function (string) {
            return this.snakeCase(string).toUpperCase();
        },
        dotCase : function (string) {
            return this.sentenceCase(string).replace(/ /g, '.');
        },
        isLowerCase : function (string) {
            return this.lowerCase(string) === string;
        },
        isUpperCase : function (string) {
            return this.upperCase(string) === string;
        },
        lowerCase : function (str) {
            var toLower = String.prototype.toLowerCase;
            return str == null ? '' : toLower.call(str);
        },
        paramCase : function (string) {
            return this.sentenceCase(string).replace(/ /g, '-');
        },
        pascalCase : function (string) {
            return this.upperCaseFirst(this.camelCase(string));
        },
        pathCase : function (string) {
            return this.sentenceCase(string).replace(/ /g, '/');
        },
        snakeCase : function (string) {
            return this.sentenceCase(string).replace(/ /g, '_');
        },
        swapCase : function (str) {
            if (str == null) {
                return '';
            }
            var result = '';
            for (var i = 0; i < str.length; i++) {
                var c = str[i];
                var u = c.toUpperCase();
                result += u === c ? c.toLowerCase() : u;
            }
            return result;
        },
        titleCase : function (string) {
            return this.sentenceCase(string).replace(/^\w| \w/g, this.upperCase);
        },
        upperCase : function (str) {
            var upperCase = String.prototype.toUpperCase;
            return str == null ? '' : upperCase.call(str);
        },
        upperCaseFirst : function (str) {
            if (str == null) {
                return '';
            }

            str = String(str);

            return str.charAt(0).toUpperCase() + str.substr(1);
        },

        cloneObj : function (obj) {
            return jQuery.extend(true,{},obj);
        },

        /**
         * esegue il merge di due configurazione di view rispettando i criteri di priorità e di
         * campi speciali.
         * @param obj1
         * @param obj2
         * @return {*}
         */
        confMerge : function(obj1,obj2) {
            var specialsKey = ['fields','fieldsConfig','customActions'];
            var c1 = this.cloneObj(obj1);
            var c2 = this.cloneObj(obj2);
            //console.log('c1',c1,'c2',c2);

            c1.fields = c1.fields?c1.fields:[];
            c1.fieldsConfig = c1.fieldsConfig?c1.fieldsConfig:{};
            c1.customActions = c1.customActions?c1.customActions:{};
            c1.actions = c1.actions?c1.actions:[];

            if (c2.fields)
                c1.fields = c2.fields;

            if (c2.fieldsConfig) {
                for (var k in c2.fieldsConfig) {
                    c1.fieldsConfig[k] = c2.fieldsConfig[k];
                }
            }
            if (c2.customActions) {
                c1.customActions = c1.customActions || {};
                for (var k in c2.customActions) {
                    c1.customActions[k] = c2.customActions[k];
                }
            }

            for (var k in c2) {
                if (specialsKey.indexOf(k) >= 0)
                    continue;
                //console.log('sovrascrivo',k);
                c1[k] = c2[k];
            }
            return c1;
        },

        merge : function(obj1, obj2) {
            return jQuery.extend(true,{},obj1,obj2);
        },

        /**
         * ritorna i parametri sotto forma di vettore associativo di un url o altrimenti di location.search
         * @param url
         */
        getAllUrlParams : function (url) {
            var params = {};
            var tmp = url?url.split('?'):location.search.split("?");


            if (tmp.length != 2)
                return params
            var sparams = tmp[1].split("&");
            for(var i in sparams) {
                var tmp = sparams[i].split("=");
                if (tmp.length != 2)
                    continue;
                var name = tmp[0];
                var value = tmp[1];
                if (name.indexOf('[]') >= 0) {
                    if (!params[name])
                        params[name] = [];
                    params[name].push(decodeURIComponent(value) )
                } else {
                    params[name] = decodeURIComponent(value);
                }

            }
            //console.log('getAllUrlParams',url,params);
            return params;

        },


        /**
         * carica un vettore di risorse, al fine caricamento chiama la callback
         * @param resources
         * @param callback
         */
        loadResources : function(resources, callback) {
            var that = this;
            var _callback = callback?callback:function () {};
            if (!resources || resources.length == 0) {
                _callback();
                return ;
            }

            var _recursive = function (i) {
                that.loadResource(resources[i],function () {
                    //log.info('_recursive', resources[i]);
                    if (i < resources.length-1) {
                        _recursive(i+1);
                    } else {
                        _callback();
                        return ;
                    }
                });
            }

            _recursive(0);
        },
        /**
         * carica una risorsa script o css dinamicamente partendo dalla cartella
         * pluginsPath quando lo script e' stato caricato chiama la callback
         * @param fileName
         * @param callback
         */
        loadResource : function (fileName, callback) {
            var that = this;
            //console.log('App.loadResourece',fileName)
            var _callback = callback?callback:function () {};
            if (!fileName) {
                that.log.warn('App.loadResorce fileName non definito!');
                _callback();
                return ;
            }
            var re = /(?:\.([^.]+))?$/;
            var ext = re.exec(fileName)[1];
            var realPath = fileName;
            if (fileName.indexOf('http') != 0) {
                realPath = ( (fileName.charAt(0) == '/') || (fileName.indexOf('../') === 0) || (fileName.indexOf('./') === 0)) ? fileName : that.$crud.pluginsPath + fileName;
            }
            if (ext == 'js') {
                this._loadScript(realPath,_callback);
            } else if (ext == 'css') {
                this._loadCss(realPath,_callback);
            } else if (ext == 'html') {
                this._loadHtml(realPath,_callback);
            } else {
                throw 'invalid extension ' + ext + ", filename: " + fileName;
            }
        },
        getRefId : function () {
            var id = "";
            for (var i = 0; i < arguments.length; i++) {
                id += arguments[i];
                if (i < arguments.length-1)
                    id += '-';
            }
            return id;
        },
        _loadHtml  : function (fileName,callback) {
            var that = this;
            var _callback = function () {
                //that.log.info('loaded... ' + scriptName);
                that.$crud._resources[fileName] = true;
                that.$crud._resources_loaded[fileName] = true;
                if (callback) {
                    callback();
                };
            }
            if (!that.$crud._resources[fileName]) {
                jQuery.get(fileName,function (html) {
                    jQuery('body').append(html);
                    callback();
                }).fail(function (e) {
                    throw 'load ' + fileName + ' failed! ' + e;
                });
            } else {
                return callback();
            }
        },
        _loadScript : function (scriptName, callback) {
            var that = this;
            var _callback = function () {
                //that.log.info('loaded... ' + scriptName)
                that.$crud._resources[scriptName] = true;
                that.$crud._resources_loaded[scriptName] = true;
                if (callback) {
                    callback();
                }
            }
            if (!that.$crud._resources[scriptName]) {
                //that.log.info('loading... ' + scriptName);

                var body 		= document.getElementsByTagName('body')[0];
                var script 		= document.createElement('script');
                script.type 	= 'text/javascript';
                script.src 		= scriptName;
                script.onload = _callback;
                script.onerror = function() {
                    that.log.error("cannot load script " + scriptName);
                }
                // fire the loading
                body.appendChild(script);
                //return _waitLoad(scriptName,_callback);
                return ;
            }
            callback();
        },

        _loadCss : function (scriptName,callback) {
            var that = this;
            var _callback = function () {
                //that.log.info('loaded... ' + scriptName);
                that.$crud._resources[scriptName] = true;
                that.$crud._resources_loaded[scriptName] = true;
                if (callback) {
                    callback();
                };
            }
            if (!that.$crud._resources[scriptName]) {
                //that.log.info('loading... ' + scriptName);
                var body 		= document.getElementsByTagName('body')[0];
                var script 		= document.createElement('link');
                script.type 	= 'text/css';
                script.rel      = 'stylesheet';
                script.href 	= scriptName;
                script.onload = _callback;
                // fire the loading
                body.appendChild(script);
                return ;
            } else {
                return callback();
            }
        }
    }
};

/**
 * definizione protocollo tra json che arriva dal server e le strutture
 * dati interne delle views alla libreria javascript
 * In caso di server con formato di dati diverso aggiungere un protocollo e definire
 * le trasformazioni in caso di record o di lista
 * vanno definiti due metodi:
 * - jsonToData chiamato per riempire le strutture dati interne
 *              utilizzando i dati arrivati in json
 * - getData che viene chiamato per prendersi i dati valorizzati dal metodo jsonToData
 */


class Protocol {
    constructor() {

    }
    getData() {
        var prop = Object.getOwnPropertyNames(this);
        var data = {}
        for (var i in prop) {
            data[prop[i]] = this[prop[i]];
        }
        return data;
    }
    jsonToData(json) {
        throw "Implentare il metodo jsonToData"
    }
}

class ProtocolRecord extends Protocol {
    constructor() {
        super();
        this.value = {};
        this.metadata = {};
    }
    jsonToData(json) {
        this.value = json.result;
        this.metadata = json.metadata?json.metadata:{};
        var fieldsMetadata = json.metadata?(json.metadata.fields || {}):{};
        for (var field in fieldsMetadata) {
            this.metadata[field] = {};
            if (fieldsMetadata[field].options)
                this.metadata[field].domainValues = fieldsMetadata[field].options;
            if (fieldsMetadata[field].options_order)
                this.metadata[field].domainValuesOrder = fieldsMetadata[field].options_order;
            if (fieldsMetadata[field].referred_data)
                this.metadata[field].modelData = fieldsMetadata[field].referred_data
            //this.metadata[field].domainValues = json.metadata[field].options?json.metadata[field].options:null;
            //this.metadata[field].domainValuesOrder = json.metadata[field].options_order?json.metadata[field].options_order:null;
        }
        var relationsMetadata = json.metadata?(json.metadata.relations || {}):{};
        for (var field in relationsMetadata) {
            this.metadata[field] = relationsMetadata[field];
            if (relationsMetadata[field].options)
                this.metadata[field].domainValues = relationsMetadata[field].options;
            if (relationsMetadata[field].options_order)
                this.metadata[field].domainValuesOrder = relationsMetadata[field].options_order;
        }
    }
}

class ProtocolList extends Protocol {
    constructor() {
        super();
        this.value = [];
        this.metadata = {};
        this.pagination = {}
    }

    jsonToData(json) {
        this.value = json.result.data;
        this.metadata = json.metadata || {};
        this.pagination = {
            current_page : json.result.current_page,
            from : json.result.from,
            last_page : json.result.last_page,
            pagination_steps : json.result.pagination_steps,
            per_page : json.result.per_page,
            to : json.result.to,
            total : json.result.total,

        }
        for (var field in json.metadata) {
            if (json.metadata[field].options)
                this.metadata[field].domainValues = json.metadata[field].options;
            if (json.metadata[field].options_order)
                this.metadata[field].domainValuesOrder = json.metadata[field].options_order;
            if (this.metadata[field].referred_data)
                this.metadata[field].modelData = fieldsMetadata[field].referred_data
        }
    }
}

/**
 * VERSIONE LIBRERIA 4
 * Classe per la gestione delle route verso il server.
 */

function Route(conf) {

    const defaultConf =  {
        method : 'get',
        url : '',
        params : {},          //  parametri da inviare alla route
        commonParams : {},    //  parametri statici da aggiungere sempre alla chiamata
        values : {},          //  vettore associativo per sostituire i parametri per la costruzione dell'url racchiusi da {}
        protocol : null,      // tipo di protocollo da usare
        resultType : null,      // tipo di risultato, 'record' o 'list'
    };

    var _c = crud.instance.cloneObj(conf || {});
    var routeConf = crud.instance.cloneObj(defaultConf);

    for (var k in _c) {
        routeConf[k] = _c[k];
    }

    /**
     * ritorna il metodo utilizzato per la richiesta al server, get o post
     * @return string
     */
    this.getMethod = function() {
        return routeConf.method;
    };
    this.setMethod = function(m) {
        routeConf.method = m;
    };
    /**
     * ritorna il metodo utilizzato per la richiesta al server, get o post
     * @return string
     */
    this.getProtocol = function() {
        return routeConf.protocol;
    };
    /**
     * ritorna url esatto valorizzando le variabili parametriche tra {} presenti nella
     * stringa url.
     * @param values: valori attuali per valorizzare le variabili se non viene passato prende
     * i valori presenti in this.values
     * @returns string url con variabili valorizzate
     */
    this.getUrl = function (values) {
        var that = this;
        var finalUrl = routeConf.url;
        var v = values?values:routeConf.values;

        for (var key in v) {
            var find = '\{'+key+'\}';
            var re = new RegExp(find, 'g');
            finalUrl = finalUrl.replace(re,v[key]);
        }
        for (var key in v) {
            var find = '\{'+key+'\\?'+'\}';
            //console.log(finalUrl,' find' + find)
            var re = new RegExp(find, 'g');
            finalUrl = finalUrl.replace(re,v[key]);
        }
        // tolgo eventuali parametri opzionali
        var re = new RegExp('\/{\\w+'+'\\?'+'\}', 'g');
        finalUrl = finalUrl.replace(re,'');
        return finalUrl;
    };

    this.setUrl = function (url) {
        routeConf.url = url;
    }
    /**
     * ritorna tutti parametri passati in get o post in base al tipo di metodo della route
     * mergiando i parametri presenti in params e extra_params
     * @returns {*}
     */
    this.getParams = function() {
        var that = this;
        return jQuery.extend(routeConf.params,routeConf.commonParams);
    };

    /**
     * setta  parametri passati in get o post in base al tipo di metodo della route
     * @params : vettore associativo di parametri da passare
     * @returns {*}
     */
    this.setParams = function(params) {
        routeConf.params = {};
        for (var k in params) {
            routeConf.params[k] = params[k];
        }
    };

    this.getValues  = function() {
        return routeConf.values;
    }
    this.setValues = function(values) {
        for (var k in values) {
            routeConf.values[k] = values[k];
        }
    }
    /**
     * ritorna le key dei parametri che devono essere valorizzati per ritornare l'url esatto
     * per esempio se url e' fatto come /pippo/{param1}/{param2} ritorna ['param1','param2']
     * return array
     */
    this.getKeys = function () {
        var self = this;
        var r = /\{\w+\}+/g;
        var keys = [];
        var tmp = false;
        do {
            tmp = r.exec(self.url);
            if (tmp) {
                var removeBrackets = tmp[0].substr(1);
                removeBrackets = removeBrackets.substr(0,removeBrackets.length-1);
                keys.push(removeBrackets);
            }
        } while(tmp)
        return keys;
    }

    this.getConf = function () {
        return routeConf;
    }
}

/**
 * Created by pier on 20/12/17.
 */

var Server = {};


/**
 * ritorna l'url reale nel dominio in cui si lavora
 * in caso di subdomain aggiunge il subdomain all'url passato
 * @param url, url a cui aggiungere il prefisso subdomain
 * @returns {*}
 *
 * **/
Server.getUrl = function (url) {
    return Server.subdomain?Server.subdomain + url:url;
};

Server.getHearders = function() {
    return {
        'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
    }
}

Server.post = function (url, params, callback) {
    var realUrl = Server.getUrl(url);
    jQuery.ajax({
        url: realUrl,
        headers: Server.getHearders(),
        type: 'POST',
        data: params,
    }).done(function(json) {
        callback(json);
    }).fail(function (data, error, msg) {
        callback({error:1,msg:msg});
    });
};

Server.get = function (url, params, callback) {
    var realUrl = Server.getUrl(url);
    jQuery.ajax({
        url: realUrl,
        headers: Server.getHearders(),
        type: 'GET',
        data: params,
    }).done(function(json) {
        callback(json);
    }).fail(function (data, error, msg) {
        callback({error:1,msg:msg});
    });
};

Server.route = function(route,callback) {
    var __cb = callback?callback:function (json) {log.debug(route.className,json)};
    var realUrl = Server.getUrl(route.getUrl());
    var params = route.getParams();
    Server[route.getMethod()](realUrl,params,function (json) {
        __cb(json);
    })
};

Server.subdomain = null;

crud.components.cComponent = Vue.component('c-component',{
    props : ['cConf','compRef'],
    mixins : [core_mixin,dialogs_mixin],
    mounted : function() {
        var that = this;
        //console.log('COMPONENTE MOUNTED',jQuery(that.$el).html());
        //console.log('c-component.mounted',that.$options.name);
        if (that.conf.cRef) {
            that.$crud.cRefs[that.conf.cRef] = this;
        }
        if (that.compRef) {
            that.$crud.cRefs[that.compRef] = this;
        }

        //if (that.conf) {
            var __call = function (lk) {
                that[lk] = function () {
                    var localk = new String(lk);
                    //var arguments = this.arguments;
                    //console.log(localk,'arguments',arguments);
                    return that.conf.methods[localk].apply(that,arguments);
                }
            }
            for (var k in that.conf.methods) {
                __call(k);
            }

            if ( that.conf.mounted) {
                that.conf.mounted.apply(that);
            }
        //}
        if (that.resources && that.resources.length) {
            that.beforeLoadResources();
            //that.resourcesLoaded = false;
            that.loadResources(that.resources,function () {
                //console.log('resoures loaded callback',that);
                that.resourcesLoaded = true;
                //setTimeout(function () {
                    that.afterLoadResources();
                //},1000)

            })
        } else {
            that.resourcesLoaded = true;
        }
    },
    data : function() {
        var d =  this._loadConf();
        d.resourcesLoaded = false;
        return d;
    },
    methods : {
        jQe : function (selector) {
            var that = this;
            if (selector) {
                return jQuery(that.$el).find(selector).addBack(selector);
            }
            return jQuery(that.$el);
        },
        _loadConf : function() {
            var _c = this._getConf() || {};
            var d = {};
            for (var k in _c) {
                if (['methods','mounted'].indexOf(k) >= 0)
                    continue;
                d[k] = _c[k];
            }
            d.conf = _c;
            return d;
        },

        _getConf : function() {
            var that = this;
            var conf = {};
            // se e' una stringa controllo prima che non sia una variabile globale
            if (typeof that.cConf === 'string' || that.cConf instanceof String) {
                conf = that.getDescendantProp(window, that.cConf);
                // altrimenti controllo che non sia una configurazione dentro la crud conf
                if (!conf) {
                    conf = that.getDescendantProp(that.$crud.conf, that.cConf);
                }
            }
            else
                conf = that.cConf;
            return conf;
        },
        /**
         * setta la configurazione della route secondo le proprie esigenze.
         * @param route
         * @returns {*}
         */
        // setRouteValues : function(route) {
        //     return route;
        // },
        /**
         * istanzia l'oggetto route definito da routeName nella configurazione altrimenti ritorna null
         * @param routeName : nome della route se null la prende dalla proprieta routeName del componente
         * @return {null}
         * @private
         */
        _getRoute : function (routeName) {
            var that = this;
            if (that.route)
                return that.route;
            var rn = routeName?routeName:that.routeName;
            if (!rn)
                return null;
            if (!that.$crud.routes[rn])
                throw "Impossibile trovare la route " + rn;
            console.log('routeName',rn,that.$crud.routes[rn])
            return new Route(that.$crud.routes[rn]);
        },

        beforeLoadResources : function () {
            console.log('cComponent.beforeLoadResources')
        },
        afterLoadResources : function () {
            console.log('cComponent.afterLoadResources');
        },

    }
});

crud.components.misc.coreCLoading = Vue.component('crud-c-loading',{
    props : {
        errorMsg : {
            defaulValue : ''
        }
    }
})

crud.components.misc.tplBase = Vue.component('tpl-base',{
    props : ['cWidget'],
    template : '<span>template base</span>'
});

crud.components.actions.coreActionBase = Vue.component('crud-action-base', {
    props : ['cConf','cKey'],
    extends : crud.components.cComponent,
    mounted : function() {
        var that = this;
        if (that.controlType == 'link') {
            that._execute();
        }
    },
    computed :  {
        _disabled : function () {
            var that = this;
            if (!that.enabled)
                return true;
            if (jQuery.isFunction(that.enabled)) {
                return !that.enabled.apply(that);
            }
            return !that.enabled;
        },
        _visible : function () {
            var that = this;
            if (!that.visible)
                return false;
            if (jQuery.isFunction(that.visible)) {
                return that.visible.apply(that);
            }
            return that.visible;
        }
    },
    methods : {

        _beforeExecute : function (callback) {
            var that =this;
            //console.log('_beforeExecute')
            if (!that.beforeExecute || !jQuery.isFunction(that.beforeExecute)) {
                callback();
                return ;
            }

            var args = that.cConf.beforeExecute.toString()
                .match(/\((?:.+(?=\s*\))|)/)[0]
                .slice(1).split(/\s*,\s*/g);
            args.forEach(function (e, i, a) {a[i] = e.trim();});
            // se before execute ha un parametro allora e' la callback che verrà chiamata in caso di esisto positivo
            if (args[0]) {
                that.cConf.beforeExecute.apply(that,[callback]);
            } else {
                // altrimenti continuo solo se before execute mi ritorna true.
                if (that.cConf.beforeExecute.apply(that) ) {
                    callback();
                }
            }


        },
        _execute : function () {
            var that = this;
            if (!that.execute || !jQuery.isFunction(that.execute)) {
                alert('definire execute');
                return ;
            }
            that._beforeExecute(function () {
                // controllo che execute abbia o no una callback per operazioni asincrone
                var args = that.cConf.execute.toString()
                    .match(/\((?:.+(?=\s*\))|)/)[0]
                    .slice(1).split(/\s*,\s*/g);
                args.forEach(function (e, i, a) {a[i] = e.trim();});
                if (args[0]) {
                    var __cb = function() {
                        that._afterExecute();
                    }
                    that.execute.apply(that,[__cb]);
                } else {
                    that.execute.apply(that);
                    that._afterExecute();
                }

            })
        },
        _afterExecute : function () {
            var that =this;
            if (!that.afterExecute || !jQuery.isFunction(that.afterExecute)) {
                return ;
            }
            that.afterExecute.apply(that);
        },

        setEnabled : function (enable) {
            this.enabled = enable;
        },

        setVisible : function (visible) {
            this.visible = visible;
        }
    },
    data :  function () {
        var that = this;
        //console.log('action-base')
        //var d =  that._loadConf();
        var d = that._getConf();
        var adata = {
            type : 'collection',
            visible : true,
            enabled : true,
            title : '',
            css: 'btn btn-outline-secondary',
            icon : '',
            text : '',
            controlType : 'button',
            href : '',
            target: '_self',
            needSelection  : false,
        };
        if (!('view' in adata) )
            adata.view = that.$parent;
        return that.merge(adata,d);
    },
});


crud.components.actions.coreActionOrder = Vue.component('crud-action-order', {
    extends : crud.components.actions.coreActionBase,
    mounted : function () {
        var direction = this.cConf.orderDirection?this.cConf.orderDirection.toLowerCase():null;
        if (direction == 'desc')
            this.icon = this.cConf.iconSortDesc;
        else if (direction == 'asc')
            this.icon = this.cConf.iconSortAsc
        else
            this.icon = this.cConf.iconSort;
        if (this.text) {
            var langKey = (this.view && this.view.langContext)?this.view.langContext+'.'+this.text:this.text;
            if (this.hasTranslation(langKey+'.label'))
                this.text = this.translate(langKey+'.label')
        }
    }
})




// Vue.component('action-dialog', {
//     extends : crud.components.cComponent,
//     template : '#action-dialog-template'
// })

crud.components.misc.coreCPaginator = Vue.component('crud-c-paginator',{
    extends : crud.components.cComponent,
    props : ['c-pagination'],
    data : function () {
        var that = this;
        //console.log('paginator',that.cPagination, that.$parent.pagination )
        var pagination = that.cPagination || that.$parent.data.pagination || {};
        var d = {
            current_page : 0,
            from : 0,
            to : 0,
            last_page : 0,
            per_page : 0,
            total : 0,
            pagination_steps : {}
        }
        return this.merge(d,pagination);
    },
    methods : {
        firstPage : function () {
            var that = this;
            if (parseInt(that.current_page) == 1)
                return ;
            that.setPage(1);
        },
        prevPage : function () {
            var that = this;
            if (parseInt(that.current_page) <= 1)
                return ;
            that.setPage(parseInt(that.current_page) - 1);
        },
        nextPage : function () {
            var that = this;
            if (parseInt(that.current_page) >= parseInt(that.last_page))
                return ;
            that.setPage(parseInt(that.current_page) + 1);
        },
        setPage : function(page) {
            var that = this;
            var route = that.$parent.route;

            var params = route.getParams();
            params['page'] = parseInt(page);
            route.setParams(params);
            that.$parent.reload();
        },
        lastPage : function () {
            var that = this;
            if (parseInt(that.current_page) >= parseInt(that.last_page))
                return ;
            that.setPage(that.last_page);
        },
    }
})

crud.components.misc.dBase = Vue.component('d-base',{
    props :  {
        'cMessage' : {
            default : ''
        },
        'cAutohide' : {
            default : true
        },
        cButtonConf : {
            default : function() {
                return {}
            }
        },
        cBig : {
            default : false
        }
    },
    extends : crud.components.cComponent,
    mounted : function () {
        var that = this;
        //console.log('message',this.cMessage,this.message)
        //that.jQe(that.selector).modal('show');
        //that.jQe(that.selector).modal({backdrop: 'static', keyboard: false})
        if (that.cAutohide) {
            that.jQe(that.selector).modal('show');
        } else {
            that.jQe(that.selector).modal({
                backdrop: 'static',
                keyboard: false,
                show : true
            })
        }

        that.jQe(that.selector).on('hidden.bs.modal', function (e) {
            that.jQe(that.selector).remove();
            that.$destroy();
        })
    },
    methods : {
        ok : function () {
            console.log('default ok')
        },
        cancel : function () {
            console.log('default cancel');
        },
        hide : function () {
            var that = this;
            that.jQe(that.selector).modal('hide');
        },
        callCb : function (key) {
            var that = this;
            that.cCallbacks[key].apply(that);
        }
    },
    data :function () {
        var message = Array.isArray(this.cMessage)?this.cMessage:[this.cMessage];
        console.log('DIALOG MSG',Array.isArray(this.cMessage),message,this.cMessage);
        return {
            message : message,
            title : this.cTitle,
        }
    }
});

crud.components.misc.coreDConfirm = Vue.component('core-d-confirm', {
    extends : crud.components.misc.dBase,
    props : {
        'c-title': {
            default : 'app.richiesta-conferma'
        }
    },
    data : function() {
        var d = {

        };
        d.selector = '[c-confirm-dialog]';
        return d;
    },
});

crud.components.misc.coreDMessage = Vue.component('core-d-message', {
    extends : crud.components.misc.dBase,
    props : {
        'cTitle': {
            default : 'app.informazione'
        }
    },
    data : function() {
        var d = {};
        d.selector = '[c-message-dialog]';
        return d;
    },
});

crud.components.misc.coreDError = Vue.component('core-d-error', {
    extends : crud.components.misc.dBase,
    props : {
        'c-title': {
            default : 'app.errore'
        }
    },
    data : function() {
        var d = {};
        d.selector = '[c-error-dialog]';
        return d;
    },
});
crud.components.misc.coreDWarning = Vue.component('core-d-warning', {
    extends : crud.components.misc.dBase,
    props : {
        'c-title': {
            default : 'app.attenzione'
        }
    },
    data : function() {
        var d = {};
        d.selector = '[c-warning-dialog]';
        return d;
    },
});

crud.components.misc.coreDCustom = Vue.component('core-d-custom', {
    extends : crud.components.misc.dBase,
    props : {
        'c-title': {
            default : ''
        },
        'c-content' : {
            default : ''
        },
        'c-callbacks' : {
            default : function () {
                return {}
            }
        }
    },
    data : function() {
        var d = {};
        d.selector = '[c-custom-dialog]';
        d.content = this.cContent;
        return d;
    },
});

crud.components.misc.coreCWait = Vue.component('crud-c-wait', {
    extends : crud.components.cComponent,
    props : ['cMsg','cGlobal'],
    data : function () {
        return {
            msg : this.cMsg?this.cMsg:'...',
            global : ('cGlobal' in this)?this.cGlobal:true
        }
    }
});

crud.components.widgets.wBase = Vue.component('w-base', {
    extends : crud.components.cComponent,
    props : ['cMarker'],
    data :  function () {
        var that = this;
        var _conf = that._getConf() || {};
        var d  = {};
        if (! ('value' in _conf))
            d.value = null;
        if (! ('defaultValue') in _conf)
            d.defaultValue = null;
        return d;
    },
    methods : {

        getFieldName: function () {
            var that = this;
            return that.name;
        },

        getValue : function() {
            return this.value;
        },
        setValue : function(value) {
            this.value = value;
        },
        reset : function() {
            //console.log('defaultValue',this.defaultValue)
            this.value = this.defaultValue;
        },
        //events
        change : function () {
            var that = this;
            var methods = that.conf.methods || {};
            if (methods.change) {
                methods.change.apply(that);
            }
        },
        updateConf : function (conf) {
            this.conf = conf;
        },
    }
});

crud.components.widgets.coreWCustom = Vue.component('core-w-custom', {
    extends : crud.components.widgets.wBase,
});

crud.components.widgets.coreWInput = Vue.component('core-w-input', {
    extends : crud.components.widgets.wBase,
    data : function () {
        var that = this;
        var _conf = that._getConf() || {};
        var d = {
            inputType : 'text'
        };
        if (_conf.inputType)
            d.inputType = _conf.inputType;
        return d;
    }
});

crud.components.widgets.coreWInputHelped =  Vue.component('core-w-input-helped', {
    extends : crud.components.widgets.wBase,
    data : function () {
        var d = {};
        if (!this.cConf.domainValuesOrder)
            d.domainValuesOrder = Object.keys(this.cConf.domainValues || {});
        if (!this.cConf.customValue)
            d.customValue = false;
        return d;
    }
});

crud.components.widgets.coreWHidden = Vue.component('core-w-hidden', {
    extends : crud.components.widgets.wBase,
});

crud.components.widgets.coreWText = Vue.component('core-w-text',{
    extends : crud.components.widgets.wBase,
});

crud.components.widgets.coreWImage = Vue.component('core-w-image',{
    extends : crud.components.widgets.wBase,
});

crud.components.widgets.coreWDownload = Vue.component('core-w-download',{
    extends : crud.components.widgets.wBase,
    mounted : function() {
        var that  =this;
        var url = that.value;
        var xhttp = new XMLHttpRequest();
        xhttp.open('HEAD', url);
        xhttp.onreadystatechange = function () {
            if (this.readyState == this.DONE) {
                console.log(this.status);
                console.log(this.getResponseHeader("Content-Type"));
            }
        };
        xhttp.send();
    },
    data : function () {
        var d = this._loadConf();
        d.icon = 'fa fa-file-o';
        return d;
    }
});

crud.components.widgets.coreWTextarea = Vue.component('core-w-textarea', {
    extends : crud.components.widgets.wBase,
});

crud.components.widgets.coreWSelect = Vue.component('core-w-select',{
    extends : crud.components.widgets.wBase,
    data :  function () {
        var d = this._loadConf();
        d.domainValues = d.domainValues || {};
        d.domainValuesOrder = d.domainValuesOrder?d.domainValuesOrder:Object.keys(d.domainValues);
        return d;
    },
    methods : {
        reset : function() {
            if (this.defaultValue)
                this.value = this.defaultValue;
            else
                this.value = this.domainValuesOrder[0];
        },
    }
});


crud.components.widgets.coreWRadio = Vue.component('core-w-radio',{
    extends : crud.components.widgets.wBase,
    data : function() {
        var that = this;
        var _conf  = that._getConf() || {};
        var d = {};
        var dV = _conf.domainValues || {};
        d.domainValuesOrder = _conf.domainValuesOrder?_conf.domainValuesOrder:Object.keys(dV);
        return d;
    },
});


crud.components.widgets.coreWCheckbox = Vue.component('core-w-checkbox',{
    extends : crud.components.widgets.wBase,
    data :  function () {
        var that = this;
        var _conf = that._getConf() || {};
        var d = {};
        var dV = _conf.domainValues || {};
        var dVO = _conf.domainValuesOrder?_conf.domainValuesOrder:Object.keys(dV);
        if (_conf.value)
            d.value = Array.isArray(_conf.value)?_conf.value:[_conf.value];
        else
            d.value = [];
        d.domainValues = dV;
        d.domainValuesOrder = dVO;
        return d;
    },
    methods : {
        getFieldName : function () {
            return this.name + '[]';
        }
    },
});


crud.components.widgets.coreWAutocomplete = Vue.component('crud-w-autocomplete', {
    extends : crud.components.widgets.wBase,
    data : function() {
        var that = this;
        var _conf = that._getConf() || {};
        var d = {};
        if (!( 'resources' in _conf) ) {
            d.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.js'
//                'autocomplete-typeahead-bootstrap/dist/latest/bootstrap-autocomplete.js'
            ];
        }
        if (!('routeName' in d))
            d.routeName = 'autocomplete';
        if (!('primaryKey' in d))
            d.primaryKey = 'id';
        d.label = '';
        d.suggestValues = {};
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            that.jQe('[c-autocomplete]').autoComplete({
                source : function(term,suggest) {
                    var r = that._getRoute(that.conf.routeName);
                    that.setRouteValues(r,term);
                    Server.route(r,function (json) {
                        var suggestions = [];
                        if (json.error) {
                            that.errorDialog(json.msg);
                            return suggest(suggestions)
                        }
                        //that.suggestValues = {};
                        for (var i in json.result) {
                            var s = that._getSuggestion(json.result[i]);
                            suggestions.push(s);
                            that.suggestValues[s] = json.result[i][that.primaryKey];
                        }
                        return suggest(suggestions)
                    })
                },
                onSelect: function(e, term, item){
                    console.log(term,that.suggestValues,'selected',that.suggestValues[term],'item',item);
                    that.value = that.suggestValues[term];
                    that.label = term;
                    that.change();
                }
            });
            that.getLabel();
        },
        setRouteValues : function (route,term) {
            var that = this;
            //var r = that.$crud.createRoute(that.conf.routeName);
            route.setValues({modelName:that.conf.modelName});
            var url = that.url?that.url:route.getUrl();
            url+= '?term='+term+'&';

            if (that.conf.labelFields) {
                for(var f in that.conf.labelFields) {
                    url+="field[]="+that.conf.labelFields[f]+"&";
                }
            }
            url += that.conf.separator ? '&separator=' + that.conf.separator : '';
            url += that.conf.n_items ? '&n_items=' + that.conf.n_items : '';
            url += that.conf.method ? '&method=' + that.conf.method: '';
            route.setUrl(url);
            return route;
            //return url;
        },

        clear : function () {
            var that = this;
            that.value = '';
            that.label = '';
            that.suggestValues = {};
            jQuery(that.$el).find('[c-autocomplete]').val('');
        },
        getLabel : function () {
            var that = this;
            if (that.modelData) {
                that.label = that._getSuggestion(that.modelData);
            }
        },
        _getSuggestion: function(rowData) {
            var that = this;
            var s = "";
            for (var k in that.conf.labelFields) {
                s += (s?' ':'') + rowData[that.conf.labelFields[k]];
            }
            return s
        }
    }
});

crud.components.widgets.coreWBelongsto = Vue.component('core-w-belongsto', {
    extends : crud.components.widgets.wBase,
});

crud.components.widgets.coreWDateSelect = Vue.component('core-w-date-select', {
    extends : crud.components.widgets.wBase,
    data : function() {
        var that = this;
        var _conf = that._getConf() || {};
        var d = {};
        if (!( 'resources' in _conf) ) {
            d.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'
            ];
        }
        d.minYear = null;
        d.maxYear = null;
        return d;
    },
    computed : {
        cDay : function () {
            var that = this;
            var d = moment(that.value);
            var days = that._dayValues();
            var cd = {
                value: d.date() > d.daysInMonth()?1:d.date(),
                domainValues: days,
                methods: {
                    change: function () {
                        that._updateSelect();
                    }
                }
            };
            return cd;
        },
        cMonth : function () {
            var that = this;
            var d = moment(that.value);
            var months = that._monthValues();
            var cm = {
                value: d.month() + 1,
                domainValues: months,
                methods: {
                    change: function () {
                        that._updateSelect();
                    }
                }
            };
            return cm;
        },
        cYear : function () {
            var that = this;
            var d = moment(that.value);
            var years = that._yearValues();
            var cy = {
                value : d.year(),
                domainValues: years,
                methods: {
                    change : function () {
                        that._updateSelect();
                    }
                }
            };
            return cy;
        }
    },
    methods : {
        _updateSelect : function() {
            var that = this;
            if (!that._getValidDate()) {
                that.errorDialog('invalid Date');
                return ;
            }
            var _cday = that.$refs.day;
            var d = moment(that.value);
            _cday.domainValues = this._dayValues();
            _cday.domainValuesOrder = Object.keys(this._dayValues());
            _cday.value =  d.date() > d.daysInMonth()?1:d.date();
        },
        _getValidDate : function() {
            var that = this;
            //var s = jQuery(that.$el).find('[c-marker="year"]').val() +  "-" + jQuery(that.$el).find('[c-marker="month"]').val().padStart(2,'0')  + "-" + jQuery(that.$el).find('[c-marker="day"]').val().padStart(2,'0') ;
            var _cday = that.$refs.day;
            var _cmonth = that.$refs.month
            var _cyear = that.$refs.year;
            var sdate = _cyear.getValue() +  "-" + _cmonth.getValue().toString().padStart(2,'0')  + "-" + _cday.getValue().toString().padStart(2,'0') ;
            var dds = moment(sdate);
            if (!dds.isValid()) {
                _cday.setValue(1);
                sdate = _cyear.getValue() +  "-" + _cmonth.getValue().toString().padStart(2,'0')  + "-" + _cday.getValue().toString().padStart(2,'0') ;
                var dds = moment(sdate);
                if (!dds.isValid())
                    return false;
            }
            that.value = sdate;
            return true;
        },
        _dayValues : function () {
            var that = this;
            var d = moment(that.value);
            var days = {};
            for (let i=1;i<=d.daysInMonth();i++) {
                days[i] = i;
            }
            return days;
        },
        _monthValues : function () {
            var that = this;
            var months = {};
            for (let i=1;i<=12;i++) {
                months[i] = i;
            }
            return months;
        },
        _yearValues : function () {
            var that = this;
            var years = {};
            var d = moment(that.value?that.value:that.conf.value);
            var minY = that.minYear?that.minYear:d.year()-5;
            var maxY = that.maxYear?that.maxYear:d.year()+5;
            for (let i=minY;i<=maxY;i++) {
                years[i] = i;
            }
            return years;
        }
    }
});

crud.components.widgets.coreWDatePicker = Vue.component('core-w-date-picker', {
    extends : crud.components.widgets.wBase,
    data : function() {
        var that = this;
        var _conf = that._getConf() || {};
        var d = {};
        if (!( 'resources' in _conf) ) {
            d.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.js'
            ];
        }
        d.displayFormat = _conf.displayFormat || "mm/dd/yyyy";
        d.dateFormat = _conf.dateFormat || d.displayFormat;
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            jQuery(that.$el).find('[c-picker]').datepicker({
                format : that.displayFormat,
            }).on('changeDate', function(ev) {
                that.value =  moment(ev.date.toISOString()).format(that.dateFormat.toUpperCase()); //ev.date.toISOString();
                that.change();
            });
            console.log('dateformat',that.dateFormat.toUpperCase())
            jQuery(that.$el).find('[c-picker]').datepicker('update',moment(that.value).format(that.displayFormat.toUpperCase()));
        }
    }
});

crud.components.widgets.coreWTexthtml = Vue.component('core-w-texthtml',{
    extends : crud.components.widgets.wBase,
    data : function() {
        var d = this._loadConf();
        if (!( 'resources' in d.conf) ) {
            d.conf.resources = [
                //'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.css',
                //'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.min.js',
                'https://cdn.jsdelivr.net/npm/summernote-bootstrap4@0.0.5/dist/summernote.css',
                'https://cdn.jsdelivr.net/npm/summernote-bootstrap4@0.0.5/dist/summernote.min.js'

            ];
        }
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            var options = that.conf.pluginOptions || {
                content : that.value,
                //airMode : true
            };
            options = this.cloneObj(options);
            that.jQe('.summernote').summernote(options);
            jQuery('.summernote').on('summernote.change', function() {
                //console.log('Enter/Return key pressed',jQuery('.summernote').summernote('code'));
                that.jQe('[c-sum]').val(jQuery('.summernote').summernote('code'));
                that.jQe('[c-sum]').trigger('change');
                //that.jQe('[c-sum]').val('hh')
            })
            jQuery('.summernote').summernote('focus');
        }
    }
});

crud.components.widgets.coreWHasmany =Vue.component('core-w-hasmany', {
    extends : crud.components.widgets.wBase,
    mounted : function() {
        var that = this;
        for (var i in that.value) {
            var _conf = that.getHasmanyConf(i,that.value[i]);
            that.confViews.push(_conf);
        }
    },
    data : function () {
        var that = this;
        var _conf = that._getConf() || {}
        var d = {};
        d.confViews = [];
        if (!("limit" in _conf) )
            d.limit = 100;
        return d;
    },

    methods : {

        getHasmanyConf : function (index,value) {
            var that = this;
            var hmConf = that.hasmanyConf || {};

            hmConf = this.confMerge({
                fields : [],
                fieldsConfig : {},
                routeName : null,
                value : {},
                metadata : {}
            },hmConf);
            hmConf.cRef = 'hm-' + index;

            if (value && Object.keys(value).length > 0) {
                hmConf.value = value;
                if (!hmConf.fields || !hmConf.fields.length) {
                    hmConf.fields = Object.keys(value);
                }
            }
            if (!value) {
                that.value[index].status = 'new';
                hmConf.value.status = 'new';
            } else {
                that.value[index].status = 'updated';
                hmConf.value.status = 'updated';
            }
            // if (!hmConf.data.value.status )
            //     hmConf.data.value.status = 'new';
            console.log('HMS',hmConf,that.value)
            return hmConf;

        },
        addItem : function () {
            var that = this;
            //var conf = that.getHasmanyConf(null);
            that.value.push({});
            that.confViews.push(that.getHasmanyConf(that.value.length-1,null));

        },
        deleteItem : function (index) {
            console.log('index',index,this.value[index].status,this.confViews[index],'hm-'+index,this.$crud.cRefs['hm-'+index]);
            if (this.value[index].status == 'new') {
                this.value.splice(index, 1);
                this.confViews.splice(index,1);
            }
            else {
                //console.log('update status deleted ', index,this.confViews[index].data.value)
                this.$set(this.value[index], 'status', 'deleted');
                this.$set(this.confViews[index].value, 'status' , 'deleted');
                this.$crud.cRefs['hm-'+index].setWidgetValue('status','deleted');
            }
            this.$forceUpdate();
        },
        showItem : function (index) {
            //console.log('show item',index,this.confViews[index]);
            if (!this.confViews[index])
                return false;
            return (this.confViews[index].value.status != 'deleted'  )
        },
        outOfLimit : function () {
            var that = this;
            var valid = 0;
            for (var i in that.value) {
                if (that.value[i].status != 'deleted')
                    valid++;
            }
            //console.log('outlimit',valid,that.limit);
            return (valid >= that.limit);
        }
    }
});

crud.components.widgets.coreWHasmanyView = Vue.component('core-w-hasmany-view', {
    extends : crud.components.widgets.coreWHasmany,
});

crud.components.widgets.coreWSwap = Vue.component('core-w-swap', {
    extends : crud.components.widgets.wBase,
    data : function () {
        var that = this;
        var d = {};
        var _conf = that._getConf() || {};
        if (!("routeName" in _conf))
            d.routeName = 'set';
        d.iconClass = 'fa fa-circle';
        d.title = "swap";
        d.swapType = _conf.swapType?_conf.swapType:'icon';
        var defaultDomainValues = {
            icon : {
                0 : 'fa fa-circle text-danger',
                1 : 'fa fa-circle text-success'
            },
            text : {
                0 : that.translate('app.no'),
                1 : that.translate('app.si')
            }
        }
        var value = _conf.value;
        var dV = (_conf.domainValues)? _conf.domainValues:defaultDomainValues[d.swapType];

        var keys = Object.keys(dV).map(String);
        if (keys.indexOf(""+value) >= 0) {
            d.slot = dV[""+value];
        } else {
            d.slot = dV[keys[0]];
        }
        d.domainValues = dV;
        return d;
    },
    methods : {
        getDV : function() {
            var that = this;
            //console.log('swaptype',that.swapType,'domainValues',that.domainValues)
            return (that.domainValues)? that.domainValues:that.domainValues[that.swapType];

        },
        setRouteValues : function(route) {
            var that = this;
            var dV = that.getDV();
            var keys = Object.keys(dV);
            var value = that.value?that.value:keys[0];
            var vs = keys.map(String);
            var index = vs.indexOf(""+value);
            index = (index + 1) % vs.length;

            route.setValues({
                modelName: that.modelName,
                field : that.name, //that.conf.key?that.conf.key:that.cKey,
                value : keys[index]
            });
            route.setParams({id:that.conf.modelData.id});
            return route;
        },
        swap : function () {
            var that = this;
            var dV = that.getDV();
            var keys = Object.keys(dV);
            var value = that.value?that.value:keys[0];
            var vs = keys.map(String);
            var index = vs.indexOf(""+value);
            index = (index + 1) % vs.length;
            //console.log('INDEX ',index,vs,keys,keys[index],vs[index]);
            that._swap(keys[index]);
        },

        _swap : function (key) {
            var that = this;
            var r = that._getRoute();
            that.setRouteValues(r);
            var dV = that.getDV();
            Server.route(r,function (json) {
                if (json.error) {
                    that.errorDialog(json.msg);
                    return;
                }
                that.value = key;
                that.slot = dV[key];
                that.change();
            })
        }
    }
});

crud.components.widgets.coreWStatus = Vue.component('core-w-status', {
    extends : crud.components.widgets.coreWSwap,
    data : function () {
        var that = this;
        var d = {};
        var _conf = that._getConf() || {};
        d.iconClass = 'fa fa-circle';
        d.title = "status";
        d.statusType = _conf.statusType?_conf.statusType:'icon';
        var defaultDomainValues = {
            icon : {
                0 : 'fa fa-circle text-danger',
                1 : 'fa fa-circle text-success'
            },
            text : {
                0 : that.translate('app.no'),
                1 : that.translate('app.si')
            }
        }
        var value = _conf.value;
        var dV = (_conf.domainValues)? _conf.domainValues:defaultDomainValues[d.swapType];

        var keys = Object.keys(dV).map(String);
        if (keys.indexOf(""+value) >= 0) {
            d.slot = dV[""+value];
        } else {
            d.slot = dV[keys[0]];
        }
        d.domainValues = dV;
        return d;
    },
    methods : {
        getDV : function() {
            var that = this;
            //console.log('swaptype',that.swapType,'domainValues',that.domainValues)
            return (that.domainValues)? that.domainValues:that.domainValues[that.statusType];

        }
    }
});

crud.components.widgets.coreWHasmanyThrough =Vue.component('core-w-hasmany-through', {
    extends : crud.components.widgets.wBase,
    methods : {
        getHasmanyConf : function (value) {
            var that = this;
            var hmConf = that.hasmanyConf?that.hasmanyConf:{
                fields : [],
                fieldsConfig : {},
                value : {},
                metadata : {},
            };
            if (value && Object.keys(value).length > 0) {
                hmConf.value = value;
                if (!hmConf.fields || !hmConf.fields.length) {
                    hmConf.fields = Object.keys(value);
                }
            } else {
                // ci sono record gia' presenti prendo da li i fields.
                if (this.value && this.value.length > 0) {
                    if (!hmConf.fields || !hmConf.fields.length) {
                        hmConf.fields = Object.keys(this.value[0]);
                        hmConf.value = this.cloneObj(this.value[0]);
                    }
                }
            }
            return hmConf;

        },
        addItem : function () {
            var that = this;
            //var conf = that.getHasmanyConf(null);
            that.value.push({});

        }
    }
});

crud.components.widgets.coreWB2Select2 = Vue.component('core-w-b2-select2', {
    extends : crud.components.widgets.wBase,
    data : function () {
        var that = this;
        var _conf = that._getConf() || {};
        var d = {};
        if (!( 'resources' in _conf) ) {
            d.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/css/select2.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/js/select2.min.js'
            ];
        }
        d.routeName = _conf.routeName || 'autocomplete';
        d.route = null;
        if (!('primaryKey' in _conf)  )
            d.primaryKey = 'id';
        return d;
    },
    methods : {
        _getAjaxConf : function() {
            var that = this;
            that.route = that._getRoute();
            that.setRouteValues(that.route);
            var url = that.route.getUrl();
            //console.log('conf',that.conf);
            //console.log('url',url);
            var ajax = {
                url : url,
                method : that.route.getMethod(),
                headers: Server.getHearders(),
                dataType: 'json',
                delay: 250,
                data: function(params) {
                    return {
                        value : params.term,
                        field : that.name,
                    }
                },
                processResults: function (json) {
                    // Tranforms the top-level key of the response object from 'items' to 'results'
                    var items = [];
                    for (var i in json.result) {
                        items.push({
                            id : json.result[i][that.primaryKey],
                            text : that.getLabel(json.result[i]),
                            record : json.result[i]
                        });
                    }
                    console.log(that.primaryKey,'items',items);
                    return {
                        results: items
                    };
                },
            };
            return ajax;
        },
        afterLoadResources : function () {
            var that = this;
            var data = [];
            //W2=this;
            // setTimeout(function () {
            //     that.afterLoadResources();
            // },2000)
            //console.log('w2-select MOUNTED',jQuery(that.$el).html());
            if (that.value) {
                data.push({
                    id : that.value,
                    selected : true,
                    text : that.getLabel(that.modelData)
                });
            }


            that.jQe('[c-select2]').select2({
                data : data,
                ajax : that._getAjaxConf(),
                placeholder: that.translate(that.placeholder?that.placeholder:'app.seleziona'),
                allowClear : that.allowClear,
                theme : that.theme,
                // ajax: {
                //     url: 'https://api.github.com/search/repositories',
                //     dataType: 'json'
                //     // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
                // }
            });
            that.jQe('[c-select2]').on('select2:select', function (e) {
                //console.log('value',that.getValue())
                that.change();
                //that.$emit('change',e);
            });
        },
        getLabel : function(value) {
            var that  =this;
            var label = "";
            for (var i in that.labelFields) {
                label += value[that.labelFields[i]] + " ";
            }
            return label;
        },
        getValue : function () {
            var that = this;
            var selValue = that.jQe('[c-select2]').select2('data');
            console.log('selvalue',selValue);
            return selValue.length>0?selValue[0].id:null;

        },
        setRouteValues : function(route) {
            route.setValues({modelName:this.modelName});
            return route;
        },
        reset : function() {
            if (this.defaultValue)
                this.value = this.defaultValue;
            else
                this.value = [];
        },
    }

});

crud.components.widgets.coreWB2mSelect2 = Vue.component('core-w-b2m-select2', {
    extends : crud.components.widgets.coreWB2Select2,
    methods : {
        afterLoadResources : function () {
            var that = this;
            var selected = [];
            for (var i in that.value) {
                selected.push({
                    id : that.value[i].id,
                    text : that.getLabel(that.value[i]),
                    selected : true,
                });
            }
            jQuery(that.$el).find('[c-select2]').select2({
                data : selected,
                ajax : that._getAjaxConf(),
                allowClear : that.allowClear,
                placeholder: that.placeholder?that.placeholder:"Seleziona",
            });

            jQuery(that.$el).find('[c-select2]').on('select2:select', function (e) {
                that._renderHidden();
                that.change(e);
            });
            jQuery(that.$el).find('[c-select2]').on('select2:unselect', function (e) {
                that._renderHidden();
                that.change(e);
            });
            that._renderHidden();

        },
        _renderHidden : function () {
            var that = this;
            var values = that.getValue();
            that.jQe('[c-selected-items]').html(' ');
            for (var i in values) {
                jQuery('<input type="hidden">').attr({
                    'name': that.getFieldName() + '-' + that.primaryKey + '[]',
                    'value':values[i]
                }).appendTo(that.jQe('[c-selected-items]'));
            }

        },
        getValue : function () {
            var that = this;
            var selValues = jQuery(that.$el).find('[c-select2]').select2('data');
            //console.log('selValues',selValues);
            var values = [];
            for (var i in selValues) {
                values.push(selValues[i].id);
            }
            //console.log('values',values);
            return values;
        },
    }

});

crud.components.widgets.coreWUpload = Vue.component('core-w-upload',{
    extends : crud.components.widgets.wBase,
    data : function () {
        var that = this;
        var _conf = that._getConf() || {};
        var d = {};
        d.extensions = _conf.extensions?_conf.extensions:'';
        d.maxFileSize = _conf.maxFileSize?_conf.maxFileSize:'';
        d.error = false;
        d.errorMessage = '';
        return d;
    },

    methods : {
        getValue : function () {
            var that = this;
            console.log('filedesc',jQuery(that.$el).find('[c-file]').prop('files'));
            var fileDesc = jQuery(that.$el).find('[c-file]').prop('files');
            if (fileDesc.length) {
                return fileDesc[0];
            }

            return null;
        },
        _validate : function() {
            return true;
        },
        validate : function () {
            var that = this;
            //TODO eseguire validazione
            console.log('validate');
            that.change();
            if (that._validate()) {
                //that.value =
                that.$emit('success', that);
            }
            else
                that.$emit('error',that);
        }
    }
})

crud.components.widgets.coreWUploadAjax = Vue.component('core-w-upload-ajax',{
    extends : crud.components.widgets.wBase,
    data : function () {
        var that = this;
        var _conf = that._getConf() || {};
        var d = {};
        d.extensions = _conf.extensions?_conf.extensions:[];
        d.maxFileSize = _conf.maxFileSize?_conf.maxFileSize:'';
        //d.uploadConf = d.conf;
        if (! ("routeName" in _conf) )
            d.routeName = 'uploadfile';

        var value = _conf.value || {};
        d.previewConf = {
            value : value,
            cRef : this._uid + 'preview'
        }
        d.value = JSON.stringify(value).replace(/\\"/g, '"');
        d.error = false;
        d.errorMessage = '';
        return d;
    },

    methods : {

        setRouteValues: function(route) {
            route.setValues({
                modelName : this.modelName
            })
            return route;
        },
        _getFileValue : function () {
            var that = this;
            console.log('filedesc',jQuery(that.$el).find('[c-file]').prop('files'));
            var fileDesc = jQuery(that.$el).find('[c-file]').prop('files');
            if (fileDesc.length) {
                return fileDesc[0];
            }

            return null;
        },
        _validate : function() {
            return true;
        },
        validate : function () {
            var that = this;
            //TODO eseguire validazione
            console.log('validate');
            that.change();
            if (that._validate()) {
                that.sendAjax();
            } else
                that.onError();
        },
        sendAjax : function () {
            var that = this;
            var fDesc = that._getFileValue();
            if (!fDesc)
                throw 'descrittore file upload non valido';
            var fileName = fDesc.filename;
            var route = that._getRoute();
            that.setRouteValues(route);
            that.error = false;
            that.complete = false;

            var realUrl = Server.getUrl(route.getUrl());
            console.log('realurl',route.getUrl())
            var fdata = new FormData();
            //data.append('file',jQuery(that.$el).find('[c-image-file]').prop('files')[0]);
            fdata.append('file',fDesc)
            console.log('ajaxFields',that.ajaxFields)
            for (var k in that.ajaxFields)
                fdata.append(k,that.ajaxFields[k])

            jQuery.ajax({
                url: realUrl,
                headers: Server.getHearders(),
                type: 'POST',
                data: fdata,
                processData: false,
                contentType: false                    // Using FormData, no need to process data.
            }).done(function(data){
                that.error = data.error;
                that.lastUpload = null;
                console.log("Success: Files sent!",data);
                if (data.error) {
                    var msg = null;
                    try {
                        var tmp = JSON.parse(data.msg);
                        msg = "";
                        for(k in tmp) {
                            msg += tmp[k]+'\n';
                        }
                    } catch(e) {
                        msg = data.msg;
                    }
                    that.errorMessage = msg;
                    //self._showError(dialog,msg);
                    jQuery(that.$el).find('[crud-button="ok"]').addClass("disabled");
                    return;
                }
                that.$emit('success',that);
                that.complete = true;

                console.log('data.result',data.result);

                that.lastUpload = that.cloneObj(data.result);

                that.value = JSON.stringify(data.result); //.replace(/\\"/g, '"');
                var refPreview = that._uid + 'preview';
                //console.log('refPreview',refPreview,that.$crud.cRefs[refPreview])
                that.$crud.cRefs[refPreview].value = data.result;
            }).fail(function(data, error, msg){
                console.log("An error occurred, the files couldn't be sent!");
                that.lastUpload = false;
                that.error = true;
                that.errorMessage = "Upload error " + data + " " + error + " " + msg;
            });
        },
    }
})

crud.components.widgets.coreWPreview = Vue.component('core-w-preview',{
    extends : crud.components.widgets.wBase,
    data : function () {
        var that = this;
        var _conf = that._getConf() || {};
        var d = {
            icon : false,
            iconClass : ''
        };
        if (!_conf.value)
            d.value = {};
        return d;
    },
    methods : {
        getType : function () {
            var that = this;
            if (!that.value.mimetype)
                return null;
            if (that.$crud.mimetypes.docTypes.indexOf(that.value.mimetype) >= 0) {
                that.icon=true;
                that.iconClass = that.$crud.icons.mimetypes['default'];
                if (that.$crud.mimetypes.icons[that.value.mimetype])
                    that.iconClass = that.$crud.mimetypes.icons[that.value.mimetype];
                return 'doc';
            }

            if (that.$crud.mimetypes.imageTypes.indexOf(that.value.mimetype) >= 0) {
                return 'image';
            }
            console.warn('mimetype invalid ' + that.value.mimetype)
            return null;
        }
    }
})

crud.components.views.vBase = Vue.component('v-base', {
    props : ['cFields','cTargetRef'],
    extends : crud.components.cComponent,
    components : {
        vAction : Vue.component('v-action', {
            props: ['cAction'],
            data: function () {
                var that = this;
                var aConf = {};
                if (that.cAction) {
                    //console.log('V-RENDER2 ',this.cRender,this.$parent.widgets);
                    aConf = {
                        name: that.cAction.name,
                        conf: that.cAction
                    }
                } else {
                    console.warn('configurazione azione non valida', this.cAction);
                }
                //console.log('v-action create', aConf);
                return aConf;
            },
            template: '<component :is="name" :c-conf="conf"></component>'
        }),
        vWidget : Vue.component('v-widget', {
            props : ['cWidget'],
            data : function() {
                if (this.cWidget) {
                    var conf = null;
                    if (typeof this.cWidget === 'string' || this.cWidget instanceof String) {
                        conf = this.getDescendantProp(window, this.cWidget);
                        if (!conf) {
                            conf = this.getDescendantProp(this.$crud.conf, this.cWidget);
                        }
                    } else
                        conf = this.cWidget;

                    //console.log('cWidget ',conf);
                    return {
                        cTemplate : conf.template,
                        conf : conf
                    }
                }
                console.warn('configurazione non valida',this.cWidget);
                return {
                    cTemplate : 'tpl-no',
                    conf : {
                        type : 'w-text'
                    },
                }

            },
            template : '<component :is="cTemplate" :c-widget="conf"></component>'
        }),
    },
    data : function () {
        return {
            viewTitle : '',
            langContext : '',
            targetRef : this.cTargetRef,
            errorMsg : '',
        }
    },
    methods : {
        // evento chiamato quando la view ha caricato i dati e disegnato tutti i controlli e azioni
        completed : function() {

        },
        fetchData: function (route,callback) {
            var that = this;
            if (!route) {
                callback({});
                return;
            }
            //console.log('fetchData',route.getConf());
            Server.route(route,function (json) {
                if (json.error) {
                    that.errorDialog(json.msg);
                    that.errorMsg = json.msg;
                    return
                }
                callback(json);
            })
        },
        getActionConfig : function(name,type) {
            //console.log('v-base.getActionConfig',name,type,this.conf);
            // se non esiste il componente di azione lo creo al volo
            if (!this.$options.components[name]) {
                //console.log('estendo azioni ',name);
                Vue.component(name, {
                    extends : crud.components.actions.actionBase
                });
            }


            var aConf = this.$crud.actions[name] || {};

            if (this.conf.customActions[name]) {
                aConf = this.merge(aConf,this.conf.customActions[name]);
            }
            //console.log('getActionConfig',aConf);
            return aConf;

            // if (this.$crud.actions[name]) {
            //     return this.cloneObj(this.$crud.actions[name]);
            // }

            // if (type == 'record') {
            //     if (this.$crud.recordActions[name]) {
            //         return this.cloneObj(this.$crud.recordActions[name]);
            //     } else
            //         throw "Azione " + name +  " di tipo record non trovata nelle azioni generali";
            // }
            // if (type == 'collection') {
            //     if (this.$crud.collectionActions[name]) {
            //         return this.cloneObj(this.$crud.collectionActions[name]);
            //     } else
            //         throw "Azione " + name +  " di tipo collection non trovata nelle azioni generali";
            // }
            throw "tipo azione type " + type +  " con nome " + name + " non trovata!";
        },

        _loadConf : function() {
            var that = this;
            var conf = null;
            var d = {};
            var type = that.cType;
            var modelName = that.cModel;
            var defaultConf = this.$crud.conf[type];
            console.log('_loadConf',modelName,type,'defaultConf',defaultConf,'cConf',this.cConf);

            if (this.cConf) {
                if (typeof this.cConf === 'string' || this.cConf instanceof String) {
                    conf = this.getDescendantProp(window, this.cConf);
                    if (!conf) {
                        conf = this.getDescendantProp(this.$crud.conf, this.cConf);
                    }
                }
                else
                    conf = this.cConf;
            } else {
                console.log('Check exist default conf '+ 'Model'+this.pascalCase(modelName));
                if (window['Model'+this.pascalCase(modelName)]) {
                    var cm = window['Model'+this.pascalCase(modelName)];
                    if (cm[type])
                        conf = cm[type];
                    else {
                        if (type == 'insert' && cm['edit'])
                            conf = cm['edit'];
                        else {
                            conf = this.$crud.conf[type];
                        }
                    }

                } else {
                    //onsole.log('get default crud conf ',type)
                    conf = this.$crud.conf[type];
                }
            }
            if (!conf) {
                console.trace();
                throw "Nessuna configurazione trovata per questa view";
            }
            //console.log('merge confs',defaultConf,conf);
            var finalConf = this.confMerge(defaultConf,conf);

            for (var k in finalConf) {
                if (k == 'methods')
                    continue;
                d[k] = finalConf[k];
            }
            d.conf = finalConf;
            console.log('finalConf',finalConf);
            return d;
        },
        /**
         * ritorna la configurazione minimale di base di un widget rispettando le priorita' tra le configurazioni
         * @param key : nome del campo di cui vogliamo la configurazione
         * @param confiName : nome variabile configurazione nell'oggetto conf. opzionale
         * @returns {{type: *}}
         * @private
         */
        _defaultWidgetConfig : function(key,configName) {
            var that = this;
            var c = {
                type:that.defaultWidgetType,
                value : null,
            };
            configName = configName?configName:'fieldsConfig';
            var conf = (that.conf[configName] && that.conf[configName][key])?that.conf[configName][key]:null;
            //console.log('CONF',key,conf,configName,that.conf[configName]);
            if (conf) {
                // in caso di stringa lo considero come il type del render
                if (typeof conf === 'string' || conf instanceof String) {
                    c.type = conf;
                } else {
                    c = this.merge(c,conf);
                }
            }

            if (!c.template)
                c.template = that.conf.widgetTemplate;
            c = this.merge( c ,(that.metadata[key] || {}));
            return c;
        },
        getFieldName : function (key) {
            return key;
        }
    }
});

crud.components.views.vRecord = Vue.component('v-record', {
    extends : crud.components.views.vBase,
    props : ['cModel','cPk'],
    mounted : function() {
        var that = this;
        if (that.cModel)
            that.conf.modelName = that.cModel;
        if (that.cPk)
            that.conf.pk = that.cPk;

        that.route = that._getRoute();
        that.setRouteValues(that.route);
        that.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.draw();
            that.loading = false;
            setTimeout(function () {
                that.completed();
            },10)

        });
    },

    data : function () {
        var that = this;
        var d =  {};
        if (that.cModel)
            d.modelName = that.cModel;
        if (that.cPk)
            d.pk = that.cPk;
        d.value = {};
        d.metadata = {};
        d.langContext = d.modelName;
        d.route = null;
        d.loading = true;
        d.widgets = {};
        d.actionsClass = [];
        d.actions = {};
        d.defaultWidgetType = 'w-input';

        return d;
    },

    methods : {

        setRouteValues : function(route) {
            return route;
        },
        draw : function() {
            var that = this;
            that.createActions();
            that.createActionsClass();
            that.createWidgets();
        },
        setWidgetValue : function(key,value) {
            var that = this;
            if (!that.widgets[key]) {
                throw 'accesso a render con chiave inesistente ' + key;
            }
            crud.cRefs[that.widgets[key].cRef].setValue(value);
        },

        createWidgets : function() {
            var that = this;
            var keys = (that.conf.fields && that.conf.fields.length > 0)?that.conf.fields:Object.keys(that.value);
            var widgets = {};
            for (var k in keys) {
                var key = keys[k];
                widgets[key] = that._defaultWidgetConfig(key);
                widgets[key].cRef = that.getRefId(that._uid,'r',key);
                widgets[key].value = null;
                if (that.value && (key in that.value) )
                    widgets[key].value = that.value[key];

                widgets[key].name = that.getFieldName(key);
                if (! ('label' in widgets[key]) )
                    widgets[key].label = key;
                //console.log('translate',that.langContext,widgets[key].label )
                widgets[key].label = that.$options.filters.translate(widgets[key].label+'.label',that.langContext);
            }

            console.log('v-record.widgets',widgets);
            that.widgets = widgets;
        },
        createActions : function() {
            var that = this;
            var actions = [];
            for (var i in that.conf.actions) {
                var aName = that.conf.actions[i];
                // if (that.$crud.collectionActions[aName])
                //     actions.push(aName);
                // if (!Vue.options.components[aName]) {
                //     console.log('CREO AZIONE ',aName);
                //     Vue.component(aName, {
                //         extends : crud.components.actions.actionBase
                //     });
                // }
                if (that.$crud.actions[aName])
                    actions.push(aName);
                else if (that.conf.customActions[aName])
                    actions.push(aName);
                else
                    console.warn("Impossibile trovare la definizione di " + aName);


            }
            that.actions = actions;
        },
        createActionsClass : function () {
            var that = this;
            var actions = {};
            console.log('confff',that.actions,that);
            for (var i in that.actions) {
                var aName = that.actions[i];
                var aConf = that.getActionConfig(aName);
                aConf.modelData = this.cloneObj(that.value); //jQuery.extend(true,{},that.data.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                aConf.cRef = that.getRefId(that._uid,'a',aName);
                aConf.name = aName;
                aConf.view = that;
                actions[aName] = aConf;
            }
            that.actionsClass = actions;
        },
        fillData : function (route,json) {
            var that = this;
            //var data = {value : {}};
            if (!route) {
                console.log('dati manuali',that.conf.value);
                if (that.conf.value) {
                    that.value = that.conf.value;
                }
            } else {
                var protocol = that.createProtocol(route.getProtocol());
                protocol.jsonToData(json);
                var prop = Object.getOwnPropertyNames(protocol);
                for (var i in prop) {
                    that[prop[i]] = protocol[prop[i]];
                }
            }

            //that.data = data;
            that.json = json;
        },
        getViewData : function () {
            var that = this;
            var data = {};
            if (that.jQe('form').length) {
                data = this.getFormData(that.jQe('form'));
            }
            return data;
        },

        reset: function() {
            var that = this;
            for (var k in that.widgets) {
                this.getWidget(k).reset();
            }
        },
        getWidget : function (key) {
            var rConf = this.widgets[key];
            console.log('getWidget',key,rConf);
            return this.$crud.cRefs[rConf.cRef];
        },
        getAction : function (name) {
            var rConf = this.actionsClass[name];
            console.log('getAction',name,rConf);
            return this.$crud.cRefs[rConf.cRef];
        }
    }
});

crud.components.views.vCollection = Vue.component('v-collection', {
    extends : crud.components.views.vBase,
    props : {
        'cModel' : {
            default: null
        },
        'cType' : {
            default: 'list'
        }
    },
    mounted : function() {
        var that = this;
        if (that.cModel)
            that.conf.modelName = that.cModel;
        that.route = that._getRoute();
        that.setRouteValues(that.route);

        that.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.keys = that.getKeys();
            that.draw();
            that.loading = false;
            setTimeout(function () {
                that.completed();
            },10);
        });
    },

    data : function () {
        var that = this;
        var d =  {};
        if (that.cModel)
            d.modelName = that.cModel;
        d.value = [];
        d.metadata = {};
        d.needSelection = false;
        return d;
    },
    methods : {

        draw : function() {
            var that = this;
            that.createActions();
            that.createActionsClass();
            that.createWidgets();
        },

        setWidgetValue : function(row,key,value) {
            var that = this;
            if (!that.widgets[row][key]) {
                throw 'accesso a render con chiave inesistente '+ row + "," + key;
            }
            that.widgets[row][key].setValue(value);
        },
        createWidgets : function () {
            var that = this;
            //console.log('Vlist-create widgets',that.data);
            var widgets = [];
            //var recordActions = that.recordActions;
            //var recordActionsName = that.recordActionsName;
            var value = that.value;
            var keys = that.keys;
            console.log('keys',keys,value);
            for (var i in value) {
                widgets.push({});
                //recordActions.push({});
                for (var k in keys) {
                    var key = keys[k];
                    var dconf = that._defaultWidgetConfig(key);
                    dconf.cRef = that.getRefId(that._uid,'r',i,key);
                    dconf.modelData = value[i];
                    if (! ('value' in dconf))
                        dconf.value = null;
                    if (value[i][key])
                        dconf.value = value[i][key];
                    dconf.name = that.getFieldName(key);
                    //console.log(i,widgets,widgets[i],key,dconf),
                    widgets[i][key] = dconf;

                }
                //that.createRecordActions(i);
            }

            that.widgets = widgets;
            //that.recordActionsName = recordActionsName;
        },
        getKeys : function () {
            var that = this;
            var keys = [];
            if (that.conf.fields && that.conf.fields.length > 0)
                keys = that.conf.fields;
            if (that.cFields) {
                keys = that.cFields.split(',');
            }
            if (keys.length == 0 && that.value.length)
                keys =Object.keys(that.value[0]);
            return keys;
        },
        getWidget : function (row,key) {
            return this.widgets[row][key];
        },
        createActions : function () {
            var that = this;
            var collectionActionsName = [];
            var recordActionsName = [];

            for (var i in that.conf.actions) {
                var aName = that.conf.actions[i];
                var aConf = {};
                if (that.$crud.actions[aName]) {
                    aConf = that.$crud.actions[aName];
                } else if(that.conf.customActions[aName]) {
                    aConf = that.conf.customActions[aName];
                } else
                    throw "Impossibile trovare la configurazione di " + aName;

                if (aConf.type == 'collection') {
                    collectionActionsName.push(aName);
                } else if (aConf.type == 'record') {
                    recordActionsName.push(aName);
                } else {
                    console.log('action ',aConf);
                    throw "tipo di action (" + aConf.type + ") non definito! valori accettati sono record,collection";
                }



                // if (that.$crud.actions[aName].type == 'collection') {
                //     collectionActionsName.push(aName);
                // } else if (that.$crud.actions[aName].type == 'record') {
                //     recordActionsName.push(aName);
                // } else {
                //     throw "tipo di action (" + that.$crud.actions[aName].type + ") non definito! valori accettati sono record,collection";
                // }
                //
                //
                // if (that.$crud.recordActions[aName])
                //     recordActionsName.push(that.conf.actions[i]);
                // else if (that.$crud.collectionActions[aName])
                //     collectionActionsName.push(aName);
                // else if (that.conf.customActions[aName]) {
                //     Vue.component(aName, {
                //         extends : crud.components.actions.actionBase
                //     });
                //     if (that.conf.customActions[aName].type == 'collection')
                //         collectionActionsName.push(aName);
                //     else if (that.conf.customActions[aName].type == 'record')
                //         recordActionsName.push(aName);
                //     else
                //         throw  "tipo di action (" + that.conf.customActions[aName].type + ") non definito! valori accettati sono record,collection";
                // } else {
                //     throw "Impossibile trovare la definizione di " + aName;
                // }
            }
            //console.log('data',data,'conf',conf,'keys',keys);
            that.collectionActionsName = collectionActionsName;
            that.recordActionsName = recordActionsName;
            that.collectionActions = {};
            that.recordActions = [];
        },

        createActionsClass : function() {
            var that = this;
            that.createCollectionActions();
            for (var i in that.value) {
                that.recordActions.push({});
                that.createRecordActions(i);
            }
        },
        createRecordActions : function(row) {
            var that = this;
            //console.log('row',row,that.recordActionsName);
            var recordActionsName = that.recordActionsName;
            var recordActions = that.recordActions;
            for(var k in recordActionsName) {
                var aName = recordActionsName[k];
                var aConf = that.getActionConfig(aName);
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = this.cloneObj(that.value[row]);
                aConf.modelName = that.cModel;
                aConf.index = row;
                aConf.cRef = that.getRefId(that._uid,'ra',row,aName);
                aConf.name = aName;
                aConf.view = that;
                recordActions[row][aName] = aConf;
            }
        },
        createCollectionActions : function () {
            var that = this;
            var collectionActions = [];
            var collectionActionsName = that.collectionActionsName;
            //var data = that.data;

            for (var i in collectionActionsName) {
                var aName = collectionActionsName[i];
                var aConf = that.getActionConfig(aName);
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = jQuery.extend(true,{},that.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                aConf.cRef = that.getRefId(that._uid,'ca',aName);
                that.needSelection = that.needSelection || aConf.needSelection;
                aConf.name = aName;
                aConf.view = that;
                collectionActions[aName] = aConf;
            }
            that.collectionActions = collectionActions;
        },
    },
});

crud.components.views.coreVList = Vue.component('core-v-list', {
    extends : crud.components.views.vCollection,
    data :  function () {
        var that = this;
        //var d = this._loadConf(that.cModel,'list');
        var _c = that._getConf() || {};
        var dList = {
            loading : true,
            widgets : {},
            keys : [],
            recordActionsName : [],
            recordActions: [],
            collectionActions : {},
            collectionActionsName : [],
            //routeConf : routeConf,
            route : null,
            //value : [],
            //metadata : {},
            maxPage : 0,
            //conf : conf,
            pagination : {},
            viewTitle : '',
            defaultWidgetType : 'w-text',
            langContext : that.cModel,
            json : {},
        };
        if (_c.viewTitle) {
            dList.viewTitle = _c.viewTitle;
        }
        return dList;
    },

    methods: {



        fillData : function(route, json) {
            var that = this;
            //var value = {};
            if (!route) {
                console.log('dati manuali',that.conf.data);
                if (that.conf.value) {
                    that.value = that.conf.value;
                    that.pagination = that.conf.data.pagination?that.conf.data.pagination:{};
                }
            } else {
                //console.log('protocol',route.getProtocol());
                //var protocol = Protocol.factory(route.getProtocol());
                var protocol = that.createProtocol(route.getProtocol());
                protocol.jsonToData(json);
                var prop = Object.getOwnPropertyNames(protocol);
                //console.log(prop);


                for (var i in prop) {
                    //console.log(k,k,prop[k]);
                    that[prop[i]] = protocol[prop[i]];
                }
                //var data = data;
                //this.maxPage = data.pagination.last_page;
                //that.pagination = data.pagination;
            }
            //that.value = data;
            that.json = json;
        },

        getOrderConf : function (key) {
            var that = this;
            var conf = that.getActionConfig('action-order','collection');
            conf.title = that.translate('app.ordina') + ' ' + key;
            conf.text = key;
            conf.orderField = that.conf.orderFields[key]?that.conf.orderFields[key]:key;
            //if (that.data.order_field)
            var order = that.metadata.order || {};
            //console.log('GETORDERCONF CALLED',key,order);
            conf.orderDirection = (order.field == conf.orderField)?order.direction:null;
            return conf;
        },
        reload : function () {
            var that = this;
            //that.route = that._getRoute(that.routeConf.values);
            //var route = Route.factory('list',that.routeConf);
            //that.route = new Route(that.routeConf);
            that.loading = true;
            that.fetchData(that.route,function (json) {
                that.fillData(that.route,json);
                that.draw();
                that.loading = false;
            });
        },
        selectAllRows : function () {
            var that = this;
            var sel = that.jQe('[c-row-check-all]').prop('checked');
            that.jQe('[c-row-check]').prop('checked',sel);
        },
        selectedRows : function () {
            var that = this;
            var sel = [];
            that.jQe('[c-row-check]').each(function () {
                if (jQuery(this).prop('checked')) {
                    var index = jQuery(this).closest('tr').index();
                    sel.push(that.value[index].id);
                }
            });
            //console.log('select3ed',sel);
            return sel;
        },
        setRouteValues : function (route) {
            var that  = this;
            if (route) {
                route.setValues({
                    modelName : that.conf.modelName
                });
            }
            return route;
        }
    },
    watch : {
        routeConf : {
            deep : true,
            handler() {
                this.reload();

            }
        }
    }
});

crud.components.views.coreVListEdit = Vue.component('core-v-list-edit', {
    extends : crud.components.views.coreVList,
    props : {
        'cModel' : {
            default: null
        },
        'cType' : {
            default: 'listEdit'
        }
    },
    data : function() {
        var dListEdit = {
            widgetsEdit : {},
            editMode : []
        };
        return dListEdit;
    },

    methods: {

        draw : function() {
            var that = this;
            that.editMode = new Array(that.value.length).fill(false);
            that.createActions();
            that.createActionsClass();
            that.createWidgets();
            that.createWidgetsEdit();
            //that.createCollectionActions();
        },

        createWidgetsEdit : function () {
            var that = this;
            //console.log('Vlist-create widgets',that.data);
            var widgetsEdit = [];
            //var data = that.data;
            var keys = that.keys;
            for (var i in that.value) {
                widgetsEdit.push({});
                for (var k in that.keys) {
                    var key = keys[k];
                    var dconf = that._defaultWidgetConfig(key,'fieldsConfigEditMode');
                    // se non c'e' la configurazione in modalità edit lo forzo ad essere un w-input
                    if (!that.conf.fieldsConfigEditMode || !that.conf.fieldsConfigEditMode[key])
                        dconf.type = 'w-input';
                    dconf.cRef = that.getRefId(that._uid,'redit',i,key);
                    dconf.modelData = that.value[i];
                    if (! ('value' in dconf))
                        dconf.value = null;
                    if (that.value[i][key])
                        dconf.value = that.value[i][key];
                    dconf.name = that.getFieldName(key);
                    widgetsEdit[i][key] = dconf;
                }
            }
            that.widgetsEdit = widgetsEdit;
        },

        setEditMode : function (index) {
            var that = this;
            that.hideRA(index,'action-delete');
            that.hideRA(index,'action-edit-mode');
            that.hideRA(index,'action-view');


            that.showRA(index,'action-view-mode');
            that.showRA(index,'action-save-row');
            //that.recordActions[index]['action-delete'].setVisible(false);
            that.$set(that.editMode,index, true);
        },
        setViewMode : function (index) {
            var that = this;
            that.$set(that.editMode,index, false);
            that.showRA(index,'action-delete');
            that.showRA(index,'action-edit-mode');
            that.showRA(index,'action-view');

            that.hideRA(index,'action-view-mode');
            that.hideRA(index,'action-save-row');
        },
        hideRA : function (index,name) {
            var that = this;
            var n = that.getRefId(that._uid,'ra',index,name);
            this.$crud.cRefs[n]? this.$crud.cRefs[n].setVisible(false):null;
        },
        showRA : function (index,name) {
            var that = this;
            var n = that.getRefId(that._uid,'ra',index,name);
            this.$crud.cRefs[n]? this.$crud.cRefs[n].setVisible(true):null;
        },
    },
    watch : {
        routeConf : {
            deep : true,
            handler() {
                this.reload();

            }
        }
    }
});

crud.components.views.coreVEdit = Vue.component('core-v-edit', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'edit'
        }
    },
    data :  function () {
        var _conf = this._getConf() || {};
        var d = {}
        d.defaultWidgetType  = _conf.defaultWidgetType?_conf.defaultWidgetType:'w-input';
        return d;
    },
    methods : {
        setRouteValues : function (route) {
            var that  = this;
            if (route) {
                route.setValues({
                    modelName : that.conf.modelName,
                    pk :that.conf.pk,
                });
            }
            return route;
        }
    },
});

crud.components.views.coreVView = Vue.component('core-v-view', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'view'
        }
    },
    data :  function () {
        var _conf = this._getConf() || {};
        var d =  {}
        d.defaultWidgetType = _conf.defaultWidgetType || 'w-text';
        return d;
    },

    methods : {
        setRouteValues : function (route) {
            var that  = this;
            if (route) {
                route.setValues({
                    modelName : that.conf.modelName,
                    pk :that.conf.pk,
                });
            }
            return route;
        }
    }
});

crud.components.views.coreVInsert = Vue.component('core-v-insert', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'insert'
        }
    },
    data :  function () {
        var _conf = this._getConf() || {};
        var d =  {}
        d.defaultWidgetType = _conf.defaultWidgetType || 'w-input';
        return d;

    },
    methods : {
        setRouteValues : function (route) {
            var that  = this;
            if (route) {
                route.setValues({
                    modelName : that.conf.modelName
                });
            }
            return route;
        }
    }
});

crud.components.views.coreVSearch = Vue.component('core-v-search', {
    extends : crud.components.views.vRecord,
    props : {
        cRouteConf : {},
        cType : {
            default : 'search'
        }
    },

    data :  function () {
        var _conf = this._getConf() || {};
        var d = {}
        d.defaultWidgetType  = _conf.defaultWidgetType?_conf.defaultWidgetType:'w-input';
        return d;
    },

    methods : {
        completed : function() {
            var that = this;
            that.jQe('form').each(function() {
                jQuery(this).find('input').keypress(function(e) {
                    // Enter pressed?
                    if(e.which == 10 || e.which == 13) {
                        var a = that.getAction('action-search');
                        a.execute();
                    }
                });
            });
        },
        getFieldName : function (key) {
            return 's_' + key;
        },
        setRouteValues : function (route) {
            var that  = this;
            if (route) {
                route.setValues({
                    modelName : that.conf.modelName
                });
            }
            return route;
        }
    }
});

crud.components.views.coreVHasmany = Vue.component('core-v-hasmany', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'insert'
        }
    },
    data :  function () {
        var _conf = this._getConf();
        var d =  {}
        d.defaultWidgetType = _conf.defaultWidgetType || 'w-input';
        console.log('VHASMANY TYPE',d);
        return d;
    },

    methods : {
        fillData : function () {
            this.value = this.conf.value;
        },
        getFieldName : function (key) {
            var that = this;
            return that.cModel + "-" + key + '[]';
        }
    }
});

crud.components.views.coreVHasmanyView = Vue.component('core-v-hasmany-view', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'view'
        }
    },
    data :  function () {
        console.log('VHASMANYVIEW',this._getConf())
        var _conf = this._getConf();
        var d =  {}
        d.defaultWidgetType = _conf.defaultWidgetType || 'w-text';
        return d;
    },
    // methods : {
    //     fillData : function () {
    //         this.data = this.cConf.data;
    //     }
    // },
});

const CrudApp = Vue.extend({
    mixins : [core_mixin,dialogs_mixin],
    data : function() {
        var d = {
            templatesFile : '/crud-vue/crud-vue.html',
            el : '#app',
            appConfig : null,
            appComponents : '/crud-vue/crud-vue-components.js',
        }
        return d;
    },
    created : function() {
        var that = this;
        Vue.prototype.$crud = crud;
        that.$crud.instance = that;
        that.$crud.pluginsPath = that.$data.pluginsPath?that.$data.pluginsPath:'/';
        var __loadResources = function () {
            var resources = [];
            resources.push(that.$data.templatesFile);
            for (var k in that.$crud.components.libs) {
                if (that.$crud.components.libs[k].tpl)
                    resources.push(that.$crud.components.libs[k].tpl);
                if (that.$crud.components.libs[k].js)
                    resources.push(that.$crud.components.libs[k].js);
            }
            console.log('resources',resources)
            that.loadResources(resources,function () {
                console.log('monto app');
                that.$mount(that.el);
                console.log('mounted');
            })
        }
        console.log('load framework components.  ' + that.$data.appComponents);
        if (!jQuery.isArray(that.$data.appComponents))
            that.$data.appComponents = [that.$data.appComponents];
        that.loadResources(that.$data.appComponents, function () {
            console.log('appConfig',that.$data.appConfig);
            if (that.$data.appConfig) {
                if (!jQuery.isArray(that.$data.appConfig))
                    that.$data.appConfig = [that.$data.appConfig];

                that.loadResources(that.$data.appConfig, function () {
                    __loadResources();
                })
            } else
                __loadResources();
        });
    }
});

Vue.filter('translate', function (value,context,plural,params) {
    var langKey = context?context+'.'+value:value;
    if (crud.instance.hasTranslation(langKey))
        return crud.instance.translate(langKey,plural,params);
    return value;
})
