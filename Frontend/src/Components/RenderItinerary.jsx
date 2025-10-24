import React from "react";

const RenderItinerary = ({ itineraryText }) => {
  return (
    <div className="space-y-6 text-gray-100">
      {itineraryText.split("\n\n").map((section, idx) => {
        const lines = section.trim().split("\n");
        const rawHeading = lines[0]
          ? lines[0].replace(/#+|\*\*/g, "").trim()
          : "";
        const isHeading =
          rawHeading.startsWith("Day") ||
          lines[0]?.startsWith("##") ||
          lines[0]?.includes("**");

        return (
          section.trim() && (
            <div
              key={idx}
              className="p-5 rounded-xl border border-gray-800 bg-gradient-to-br from-[#121616] to-[#0c1010] shadow-md hover:border-[#ACD3A8]/40 transition duration-300"
            >
              {/* Heading Styling */}
              {isHeading ? (
                <h4 className="text-xl font-extrabold mb-3 text-[#ACD3A8] border-b border-gray-700/50 pb-2">
                  {rawHeading}
                </h4>
              ) : null}

              {/* Content Styling */}
              <div className="text-sm leading-relaxed text-gray-300 space-y-2">
                {lines.slice(isHeading ? 1 : 0).map((line, i) => {
                  // 1. Remove leading/trailing asterisks for general cleanup
                  let trimmed = line.trim().replace(/^\*+|\*+$/g, "");
                  if (!trimmed) return null;

                  // 2. Process for inline formatting: Bold and Italic (now using single * for italic)
                  const formattedLine = trimmed
                    // Remove double asterisks and replace with strong tags for bolding
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    // Remove single asterisks and replace with em tags for italics, only if they are not part of an existing list marker
                    .replace(
                      /(^|[^a-zA-Z0-9])\*([^*]+)\*($|[^a-zA-Z0-9])/g,
                      "$1<em>$2</em>$3"
                    );

                  // 3. Determine if it's a list item (using the clean bullet or number)
                  const isBullet =
                    trimmed.startsWith("-") || trimmed.startsWith("•");
                  const isNumbered = /^\d+\./.test(trimmed);

                  if (isBullet || isNumbered) {
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-3 ml-2 text-gray-200"
                      >
                        {/* Use a filled circle (•) or right arrow (→) as the bullet/indicator */}
                        <span className="mt-0.5 text-[#ACD3A8] flex-shrink-0 font-bold">
                          {isBullet ? "•" : "→"}
                        </span>
                        <span
                          className="flex-1"
                          // Remove Markdown list markers and render the HTML content
                          dangerouslySetInnerHTML={{
                            __html: formattedLine.replace(
                              /^[-•]\s*|\d+\.\s*/,
                              ""
                            ),
                          }}
                        />
                      </div>
                    );
                  }
                  return (
                    <p
                      key={i}
                      dangerouslySetInnerHTML={{
                        __html: formattedLine,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default RenderItinerary;
