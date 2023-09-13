<?php

class BaseController

{

    /**

* __call magic method.

*/

    public function __call($name, $arguments)

    {

        $this->sendOutput('', array('HTTP/1.1 404 Not Found'));

    }

    /**

* Get URI elements.

*

* @return array

*/

    protected function getUriSegments()

    {

        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        $uri = explode( '/', $uri );

        return $uri;

    }

    /**

* Get querystring params.

*

* @return array

*/

    protected function getQueryStringParams()

    {

        return parse_str($_SERVER['QUERY_STRING'], $query);

    }

}
