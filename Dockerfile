FROM node:8.10.0
#some dummy comment
EXPOSE 80
COPY ./* ./
RUN npm i
CMD node index.js